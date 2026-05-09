import { apiRequest } from "@/lib/api/client";

export type MemberProfileResponse = {
  id: string;
  fullName: string;
  email: string;
  title: string | null;
  phone: string | null;
  city: string | null;
  country: string | null;
  expertise: string | null;
  memberType: string;
  memberStatus: string;
  avatarUrl: string | null;
  joinedAt: string | null;
};

export type UpdateMemberProfilePayload = {
  fullName: string;
  title?: string | null;
  phone?: string | null;
  city?: string | null;
  country?: string | null;
  expertise?: string | null;
  avatarUrl?: string | null;
};

const withUserEmailHeader = (userEmail: string, headers?: Record<string, string>) => ({
  ...(headers ?? {}),
  "X-User-Email": userEmail,
});

export function getMemberProfile(userEmail: string) {
  return apiRequest<MemberProfileResponse>("/api/member/profile", {
    headers: withUserEmailHeader(userEmail),
  });
}

export function updateMemberProfile(userEmail: string, payload: UpdateMemberProfilePayload) {
  return apiRequest<MemberProfileResponse>("/api/member/profile", {
    method: "PUT",
    headers: withUserEmailHeader(userEmail, { "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
}
