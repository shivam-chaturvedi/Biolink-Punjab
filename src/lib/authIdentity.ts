const RESERVED_AUTH_DOMAIN = "biolink-auth.local";

const toBase64Url = (value: string) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

export const toSupabaseEmail = (identifier: string) => {
  const normalized = identifier.trim().toLowerCase();
  return normalized;
};

export const toFallbackAuthEmail = (identifier: string) => {
  const normalized = identifier.trim().toLowerCase();
  return `${toBase64Url(normalized)}@${RESERVED_AUTH_DOMAIN}`;
};

export const isInvalidEmailError = (message: string) =>
  message.toLowerCase().includes("email address") && message.toLowerCase().includes("invalid");
