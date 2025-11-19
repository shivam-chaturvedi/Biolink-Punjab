import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Phone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { PUNJAB_DISTRICTS } from "@/constants/punjabDistricts";

const heroBackground = "/images/hero-background.jpg";

const FarmerLogin = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    name: "",
    district: "",
    customDistrict: "",
    password: ""
  });

  useEffect(() => {
    if (user && profile?.role === "farmer") {
      navigate("/farmer-dashboard");
    }
  }, [user, profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message);
        setIsSubmitting(false);
        return;
      }

      await refreshProfile();
      toast.success("Welcome back!");
      navigate("/farmer-dashboard");
      setIsSubmitting(false);
      return;
    }

    const finalDistrict =
      formData.district === "Other" ? formData.customDistrict : formData.district;

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          role: "farmer",
          phone: formData.phone,
          full_name: formData.name,
          district: finalDistrict,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setIsSubmitting(false);
      return;
    }

    if (data.user) {
      const profilePayload = {
        id: data.user.id,
        role: "farmer" as const,
        full_name: formData.name,
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
    navigate("/");
    setIsSubmitting(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-16 px-4"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <Card className="relative z-10 w-full max-w-md p-8 shadow-large">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            {isLogin ? "Farmer Login" : "Farmer Registration"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? "Welcome back! Login to sell your stubble" : "Join thousands of farmers earning from stubble"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                required
                className="mt-2"
              />
            </div>
          )}

          {!isLogin && (
            <div>
              <Label htmlFor="phone" className="font-semibold">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                required
                className="mt-2 h-11"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="font-semibold">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              required
              className="mt-2 h-11"
            />
          </div>

          {!isLogin && (
            <div>
              <Label htmlFor="district">District</Label>
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
                required
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
                  required
                />
              )}
            </div>
          )}

          <div>
            <Label htmlFor="password">Password</Label>
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

          <Button type="submit" className="w-full gradient-green text-primary-foreground" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span className="text-sm">Need help? Call our 24/7 helpline</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2 text-primary">Simple Registration Process:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>✓ Register with your phone number</li>
            <li>✓ Large buttons for easy navigation</li>
            <li>✓ Mobile-first design</li>
            <li>✓ Support available via phone</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default FarmerLogin;
