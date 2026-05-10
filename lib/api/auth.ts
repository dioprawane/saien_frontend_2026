import type { UserSession } from "@/components/auth/UserSessionContext";
import { apiRequest, normalizeApiUrl } from "@/lib/api/client";

export type AuthApiSession = {
  id: string;
  fullName: string;
  email: string;
  role: "member" | "admin" | "super-admin";
  isMember: boolean;
  memberLabel: string;
  avatarUrl: string;
  emailVerified: boolean;
};

export type AuthApiResponse = {
  token: string;
  emailVerificationToken: string | null;
  session: AuthApiSession;
};

export type ApiMessageResponse = {
  message: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type VerifyEmailPayload = {
  token: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  newPassword: string;
};

export function toUserSession(apiSession: AuthApiSession): UserSession {
  return {
    id: apiSession.id,
    fullName: apiSession.fullName,
    email: apiSession.email,
    role: apiSession.role,
    isMember: apiSession.isMember,
    memberLabel: apiSession.memberLabel,
    avatarUrl: normalizeApiUrl(apiSession.avatarUrl) ?? apiSession.avatarUrl,
    emailVerified: apiSession.emailVerified,
  };
}

export function register(payload: RegisterPayload) {
  return apiRequest<AuthApiResponse>("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function login(payload: LoginPayload) {
  return apiRequest<AuthApiResponse>("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function verifyEmail(payload: VerifyEmailPayload) {
  return apiRequest<ApiMessageResponse>("/api/auth/verify-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function resendVerification(email: string) {
  return apiRequest<ApiMessageResponse>(
    `/api/auth/resend-verification?email=${encodeURIComponent(email)}`,
    {
      method: "POST",
    },
  );
}

export function forgotPassword(payload: ForgotPasswordPayload) {
  return apiRequest<ApiMessageResponse>("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function resetPassword(payload: ResetPasswordPayload) {
  return apiRequest<ApiMessageResponse>("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
