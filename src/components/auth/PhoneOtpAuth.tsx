import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  OTP_LENGTH,
  OTP_RESEND_SECONDS,
  isProfileComplete,
  sendPhoneOtp,
  upsertProfileFromMetadata,
  verifyPhoneOtp,
  type ProfileRole,
} from "@/lib/phoneAuth";
import { supabase } from "@/lib/supabaseClient";

type OtpStep = "phone" | "otp";

type UsePhoneOtpFlowOptions = {
  role: ProfileRole;
  isLogin: boolean;
  getProfileMetadata: () => Record<string, string | undefined> | undefined;
  refreshProfile: () => Promise<void>;
  onSuccess: () => void;
};

export function usePhoneOtpFlow({
  role,
  isLogin,
  getProfileMetadata,
  refreshProfile,
  onSuccess,
}: UsePhoneOtpFlowOptions) {
  const [otpStep, setOtpStep] = useState<OtpStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = window.setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  const resetOtpFlow = useCallback(() => {
    setOtpStep("phone");
    setOtp("");
    setResendCooldown(0);
  }, []);

  const sendOtp = useCallback(async () => {
    const baseMetadata = isLogin ? undefined : getProfileMetadata();
    if (!isLogin && !baseMetadata) {
      toast.error("Please fill in all required registration fields.");
      return false;
    }

    const metadata = baseMetadata ? { ...baseMetadata, phone } : undefined;

    setIsSubmitting(true);
    const { phone: normalizedPhone, error } = await sendPhoneOtp(phone, metadata);
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message);
      return false;
    }

    if (normalizedPhone) {
      setPhone(normalizedPhone);
    }

    setOtpStep("otp");
    setOtp("");
    setResendCooldown(OTP_RESEND_SECONDS);
    toast.success("OTP sent to your phone.");
    return true;
  }, [phone, isLogin, getProfileMetadata]);

  const verifyAndComplete = useCallback(async () => {
    if (otp.length !== OTP_LENGTH) {
      toast.error(`Enter the ${OTP_LENGTH}-digit OTP.`);
      return;
    }

    setIsSubmitting(true);
    const { data, error } = await verifyPhoneOtp(phone, otp);
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (!data.user) {
      toast.error("Verification failed. Please try again.");
      return;
    }

    const { data: existingProfile, error: profileError } = await supabase
      .from("profiles")
      .select("role, full_name, company_name, district")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) {
      toast.error(profileError.message);
      return;
    }

    if (isLogin) {
      if (
        !existingProfile ||
        existingProfile.role !== role ||
        !isProfileComplete(existingProfile, role)
      ) {
        toast.error("No account found. Please register first.");
        await supabase.auth.signOut();
        return;
      }
    } else {
      if (
        existingProfile &&
        isProfileComplete(existingProfile, existingProfile.role as ProfileRole) &&
        existingProfile.role !== role
      ) {
        toast.error(
          `This phone number is already registered as a ${existingProfile.role}.`
        );
        await supabase.auth.signOut();
        return;
      }

      const metadata = getProfileMetadata();
      if (metadata) {
        await supabase.auth.updateUser({
          data: { ...metadata, role, phone },
        });

        const { error: upsertError } = await upsertProfileFromMetadata(
          data.user.id,
          role,
          metadata,
          phone
        );

        if (upsertError) {
          toast.error(upsertError.message);
          return;
        }
      }
    }

    await refreshProfile();
    toast.success(isLogin ? "Welcome back!" : "Registration successful!");
    if (!isLogin) {
      sessionStorage.setItem("biolink:reload-dashboard-once", "1");
    }
    onSuccess();
  }, [otp, phone, isLogin, role, getProfileMetadata, refreshProfile, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpStep === "phone") {
      await sendOtp();
    } else {
      await verifyAndComplete();
    }
  };

  return {
    otpStep,
    phone,
    setPhone,
    otp,
    setOtp,
    isSubmitting,
    resendCooldown,
    resetOtpFlow,
    sendOtp,
    handleSubmit,
    setOtpStep,
  };
}

type PhoneOtpFieldsProps = {
  otpStep: OtpStep;
  phone: string;
  onPhoneChange: (value: string) => void;
  otp: string;
  onOtpChange: (value: string) => void;
  resendCooldown: number;
  onResend: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  isLogin: boolean;
  submitLabel: string;
  submitClassName?: string;
  onSubmit: (e: React.FormEvent) => void;
};

export function PhoneOtpFields({
  otpStep,
  phone,
  onPhoneChange,
  otp,
  onOtpChange,
  resendCooldown,
  onResend,
  onBack,
  isSubmitting,
  isLogin,
  submitLabel,
  submitClassName,
  onSubmit,
}: PhoneOtpFieldsProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {otpStep === "phone" ? (
        <div>
          <Label htmlFor="phone-auth" className="font-semibold">
            Phone Number *
          </Label>
          <Input
            id="phone-auth"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            required
            className="mt-2 h-11"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            {isLogin
              ? "We'll send a one-time code to sign you in."
              : "We'll verify your number with a one-time code."}
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-lg bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
            OTP sent to <span className="font-medium text-foreground">{phone}</span>
          </div>

          <div>
            <Label htmlFor="otp" className="font-semibold">
              Enter OTP *
            </Label>
            <div className="mt-3 flex justify-center">
              <InputOTP
                id="otp"
                maxLength={OTP_LENGTH}
                value={otp}
                onChange={onOtpChange}
                disabled={isSubmitting}
              >
                <InputOTPGroup>
                  {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground hover:underline"
            >
              Change number
            </button>
            <button
              type="button"
              onClick={onResend}
              disabled={resendCooldown > 0 || isSubmitting}
              className="text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
            </button>
          </div>
        </>
      )}

      <Button type="submit" className={submitClassName ?? "w-full"} disabled={isSubmitting}>
        {isSubmitting
          ? "Processing..."
          : otpStep === "phone"
            ? "Send OTP"
            : submitLabel}
      </Button>
    </form>
  );
}
