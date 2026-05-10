import { apiRequest } from "@/lib/api/client";

export type MembershipType = "active" | "adherent" | "honor" | "benefactor";
export type MembershipSource = "website" | "event" | "referral";

export type MembershipApplicationPayload = {
  fullName: string;
  email: string;
  type: MembershipType;
  source: MembershipSource;
  title?: string;
  phone?: string;
  city?: string;
  country?: string;
  expertise?: string;
  professionalBackground?: string;
  accountMode?: "new" | "existing";
  imageConsent?: boolean;
  paymentMethod?: string;
  paymentReference?: string;
  paymentDate?: string;
};

export type MembershipApplicationResponse = {
  id: string;
  fullName: string;
  email: string;
  type: MembershipType;
  source: MembershipSource;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  reviewer?: string | null;
  reviewedAt?: string | null;
  note?: string | null;
  title?: string | null;
  phone?: string | null;
  city?: string | null;
  country?: string | null;
  expertise?: string | null;
  professionalBackground?: string | null;
  accountMode?: string | null;
  imageConsent?: boolean;
  paymentMethod?: string | null;
  paymentReference?: string | null;
  paymentDate?: string | null;
};

export function submitMembershipApplication(payload: MembershipApplicationPayload) {
  return apiRequest<MembershipApplicationResponse>("/api/memberships/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
