import { apiRequest, normalizeApiUrl } from "@/lib/api/client";

export type MemberProfileResponse = {
  id: string;
  fullName: string;
  email: string;
  title: string | null;
  phone: string | null;
  city: string | null;
  country: string | null;
  expertise: string | null;
  linkedinUrl: string | null;
  networkBio: string | null;
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
  linkedinUrl?: string | null;
  networkBio?: string | null;
};

function normalizeMemberProfile(profile: MemberProfileResponse): MemberProfileResponse {
  return {
    ...profile,
    avatarUrl: normalizeApiUrl(profile.avatarUrl) ?? profile.avatarUrl,
  };
}

const withUserEmailHeader = (userEmail: string, headers?: Record<string, string>) => ({
  ...(headers ?? {}),
  "X-User-Email": userEmail,
});

export function getMemberProfile(userEmail: string) {
  return apiRequest<MemberProfileResponse>("/api/member/profile", {
    headers: withUserEmailHeader(userEmail),
  }).then(normalizeMemberProfile);
}

export function updateMemberProfile(userEmail: string, payload: UpdateMemberProfilePayload) {
  return apiRequest<MemberProfileResponse>("/api/member/profile", {
    method: "PUT",
    headers: withUserEmailHeader(userEmail, { "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  }).then(normalizeMemberProfile);
}

export function uploadMemberAvatar(userEmail: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<MemberProfileResponse>("/api/member/profile/upload-avatar", {
    method: "POST",
    headers: withUserEmailHeader(userEmail),
    body: formData,
  }).then(normalizeMemberProfile);
}

export type MemberEventResponse = {
  id: string;
  title: string;
  startsAt: string;
  location: string;
  status: "REGISTERED" | "INVITED" | "PAST";
  joinLink: string | null;
};

export function getMemberEvents(userEmail: string) {
  return apiRequest<MemberEventResponse[]>("/api/member/events", {
    headers: withUserEmailHeader(userEmail),
  });
}
