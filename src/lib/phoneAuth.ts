import { supabase } from "@/lib/supabaseClient";

export const DEFAULT_COUNTRY_CODE = "+91";
export const OTP_LENGTH = 6;
export const OTP_RESEND_SECONDS = 60;

export type ProfileRole = "farmer" | "buyer";

export type ProfileCheckRow = {
  role: string;
  full_name?: string | null;
  company_name?: string | null;
  district?: string | null;
};

export function normalizePhone(input: string): string | null {
  const trimmed = input.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (digits.length === 10) {
    return `${DEFAULT_COUNTRY_CODE}${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return `+${digits}`;
  }

  if (trimmed.startsWith("+") && digits.length >= 10 && digits.length <= 15) {
    return `+${digits}`;
  }

  return null;
}

export function isValidPhoneInput(input: string): boolean {
  return normalizePhone(input) !== null;
}

export function isProfileComplete(profile: ProfileCheckRow, role: ProfileRole): boolean {
  if (role === "farmer") {
    return Boolean(profile.full_name?.trim() && profile.district?.trim());
  }

  return Boolean(profile.company_name?.trim() && profile.district?.trim());
}

export async function sendPhoneOtp(phone: string, metadata?: Record<string, string>) {
  const normalized = normalizePhone(phone);
  if (!normalized) {
    return { phone: null, error: new Error("Enter a valid 10-digit mobile number.") };
  }

  const { error } = await supabase.auth.signInWithOtp({
    phone: normalized,
    options: metadata ? { data: metadata } : undefined,
  });

  return { phone: normalized, error };
}

export async function verifyPhoneOtp(phone: string, token: string) {
  const normalized = normalizePhone(phone) ?? phone;

  const { data, error } = await supabase.auth.verifyOtp({
    phone: normalized,
    token,
    type: "sms",
  });

  return { data, error };
}

export async function upsertProfileFromMetadata(
  userId: string,
  role: ProfileRole,
  metadata: Record<string, string | undefined>,
  phone: string
) {
  const base = {
    id: userId,
    role,
    phone,
  };

  const profilePayload =
    role === "farmer"
      ? {
          ...base,
          full_name: metadata.full_name,
          district: metadata.district,
        }
      : {
          ...base,
          company_name: metadata.company_name,
          gst_number: metadata.gst_number,
          contact_person: metadata.contact_person,
          district: metadata.district,
        };

  return supabase.from("profiles").upsert(profilePayload, { onConflict: "id" });
}
