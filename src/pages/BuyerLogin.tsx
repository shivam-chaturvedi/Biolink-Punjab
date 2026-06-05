import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Mail, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { PUNJAB_DISTRICTS } from "@/constants/punjabDistricts";
import { isInvalidEmailError, toFallbackAuthEmail, toSupabaseEmail } from "@/lib/authIdentity";
import { PhoneOtpFields, usePhoneOtpFlow } from "@/components/auth/PhoneOtpAuth";

const mustardField = "/images/mustard-field.jpg";

type AuthMethod = "email" | "phone";

const BuyerLogin = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<AuthMethod>("phone");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    gstNumber: "",
    contactPerson: "",
    phone: "",
    district: "",
    customDistrict: "",
    password: "",
  });

  useEffect(() => {
    if (user && profile?.role === "buyer") {
      navigate("/buyer-dashboard");
    }
  }, [user, profile, navigate]);

  const getProfileMetadata = useCallback(() => {
    const finalDistrict =
      formData.district === "Other" ? formData.customDistrict : formData.district;

    if (!formData.companyName.trim() || !finalDistrict?.trim()) {
      return undefined;
    }

    return {
      role: "buyer",
      company_name: formData.companyName.trim(),
      gst_number: formData.gstNumber.trim(),
      contact_person: formData.contactPerson.trim(),
      district: finalDistrict.trim(),
    };
  }, [
    formData.companyName,
    formData.gstNumber,
    formData.contactPerson,
    formData.district,
    formData.customDistrict,
  ]);

  const phoneOtp = usePhoneOtpFlow({
    role: "buyer",
    isLogin,
    getProfileMetadata,
    refreshProfile,
    onSuccess: () => navigate("/buyer-dashboard"),
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const rawEmail = toSupabaseEmail(formData.email);

    if (isLogin) {
      const signInAttempt = async (email: string) =>
        supabase.auth.signInWithPassword({
          email,
          password: formData.password,
        });

      let { error } = await signInAttempt(rawEmail);

      if (error && isInvalidEmailError(error.message)) {
        const fallbackEmail = toFallbackAuthEmail(formData.email);
        ({ error } = await signInAttempt(fallbackEmail));
      }

      if (error) {
        toast.error(error.message);
        setIsSubmitting(false);
        return;
      }

      await refreshProfile();
      toast.success("Welcome back!");
      navigate("/buyer-dashboard");
      setIsSubmitting(false);
      return;
    }

    const finalDistrict =
      formData.district === "Other" ? formData.customDistrict : formData.district;

    const signUpAttempt = async (email: string) =>
      supabase.auth.signUp({
        email,
        password: formData.password,
        options: {
          data: {
            role: "buyer",
            company_name: formData.companyName,
            gst_number: formData.gstNumber,
            contact_person: formData.contactPerson,
            phone: formData.phone,
            district: finalDistrict,
          },
        },
      });

    let { data, error } = await signUpAttempt(rawEmail);

    if (error && isInvalidEmailError(error.message)) {
      const fallbackEmail = toFallbackAuthEmail(formData.email);
      ({ data, error } = await signUpAttempt(fallbackEmail));
    }

    if (error) {
      toast.error(error.message);
      setIsSubmitting(false);
      return;
    }

    if (data.user) {
      const profilePayload = {
        id: data.user.id,
        role: "buyer" as const,
        company_name: formData.companyName,
        gst_number: formData.gstNumber,
        contact_person: formData.contactPerson,
        phone: formData.phone,
        district: finalDistrict,
      };

      const { error: profileError } = await supabase.from("profiles").upsert(profilePayload, {
        onConflict: "id",
      });

      if (profileError) {
        toast.error(profileError.message);
        setIsSubmitting(false);
        return;
      }

      await refreshProfile();
    }

    toast.success("Registration successful!");
    sessionStorage.setItem("biolink:reload-dashboard-once", "1");
    navigate("/buyer-dashboard");
    setIsSubmitting(false);
  };

  const toggleLoginMode = () => {
    setIsLogin((prev) => !prev);
    phoneOtp.resetOtpFlow();
  };

  const registrationFields = !isLogin && (
    <>
      <div>
        <Label htmlFor="district">District *</Label>
        <select
          id="district"
          value={formData.district}
          onChange={(e) =>
            setFormData({
              ...formData,
              district: e.target.value,
              customDistrict: e.target.value === "Other" ? formData.customDistrict : "",
            })
          }
          required={authMethod === "phone"}
          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Select district
          </option>
          {PUNJAB_DISTRICTS.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        {formData.district === "Other" && (
          <Input
            className="mt-3"
            placeholder="Enter district"
            value={formData.customDistrict}
            onChange={(e) => setFormData({ ...formData, customDistrict: e.target.value })}
            required={authMethod === "phone"}
          />
        )}
      </div>

      <div>
        <Label htmlFor="companyName">Company Name *</Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          placeholder="Your company name"
          required={authMethod === "phone"}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="gstNumber">GST Number</Label>
        <Input
          id="gstNumber"
          value={formData.gstNumber}
          onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
          placeholder="GST number"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="contactPerson">Contact Person</Label>
        <Input
          id="contactPerson"
          value={formData.contactPerson}
          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
          placeholder="Primary contact name"
          className="mt-2"
        />
      </div>
    </>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center py-16 px-4"
      style={{
        backgroundImage: `url(${mustardField})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />

      <Card className="relative z-10 w-full max-w-lg p-8 shadow-large">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full gradient-warm flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-secondary mb-2">
            {isLogin ? "Buyer Login" : "Buyer Registration"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? "Access verified farmer listings" : "Register your industry to source quality stubble"}
          </p>
        </div>

        <Tabs
          value={authMethod}
          onValueChange={(value) => {
            setAuthMethod(value as AuthMethod);
            phoneOtp.resetOtpFlow();
          }}
          className="mb-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="phone" className="gap-2">
              <Smartphone className="h-4 w-4" />
              Phone OTP
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phone" className="mt-4">
            {registrationFields}
            <PhoneOtpFields
              otpStep={phoneOtp.otpStep}
              phone={phoneOtp.phone}
              onPhoneChange={phoneOtp.setPhone}
              otp={phoneOtp.otp}
              onOtpChange={phoneOtp.setOtp}
              resendCooldown={phoneOtp.resendCooldown}
              onResend={phoneOtp.sendOtp}
              onBack={() => phoneOtp.setOtpStep("phone")}
              isSubmitting={phoneOtp.isSubmitting}
              isLogin={isLogin}
              submitLabel={isLogin ? "Login" : "Register"}
              submitClassName="w-full gradient-warm text-secondary-foreground"
              onSubmit={phoneOtp.handleSubmit}
            />
          </TabsContent>

          <TabsContent value="email" className="mt-4">
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {registrationFields}

              {!isLogin && (
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="mt-2"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="company@example.com"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password"
                  required
                  className="mt-2"
                />
              </div>

              <Button
                type="submit"
                className="w-full gradient-warm text-secondary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : isLogin ? "Login" : "Register"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <button onClick={toggleLoginMode} className="text-secondary hover:underline">
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2 text-secondary">Industry Registration Benefits:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>✓ Login with phone OTP or email</li>
            <li>✓ Filter by district, price, and volume</li>
            <li>✓ Secure payment options</li>
            <li>✓ Logistics support available</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default BuyerLogin;
