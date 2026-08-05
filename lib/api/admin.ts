import { apiRequest } from "@/lib/api/client";

export type AdminRegistrationStatus = "pending" | "approved" | "rejected";
export type AdminMemberType = "active" | "adherent" | "honor" | "benefactor";
export type AdminRegistrationSource = "website" | "event" | "referral";
export type AdminMemberStatus = "active" | "pending" | "expired" | "suspended";
export type AdminRole = "member" | "admin" | "super-admin" | "admin-event";

export type AdminRegistration = {
  id: string;
  fullName: string;
  email: string;
  type: AdminMemberType;
  source: AdminRegistrationSource;
  submittedAt: string;
  status: AdminRegistrationStatus;
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

export type AdminSummary = {
  totalMembers: number;
  activeMembers: number;
  suspendedMembers: number;
  pendingRegistrations: number;
  approvedRegistrations: number;
  rejectedRegistrations: number;
  publishedEvents: number;
};

export type AdminMember = {
  id: string;
  fullName: string;
  email: string;
  type: AdminMemberType | null;
  status: AdminMemberStatus | null;
  role: AdminRole;
  city: string;
  joinedAt: string;
  lastPaymentAt: string;
  title?: string | null;
  phone?: string | null;
  country?: string | null;
  expertise?: string | null;
  avatarUrl?: string | null;
};

type RegistrationStatusUpdatePayload = {
  status: AdminRegistrationStatus;
  reviewer?: string;
  note?: string;
};

type CreateAdminMemberPayload = {
  fullName: string;
  email: string;
  type: AdminMemberType;
  city: string;
  role: AdminRole;
  title?: string;
  phone?: string;
  country?: string;
  expertise?: string;
};

export function getAdminSummary() {
  return apiRequest<AdminSummary>("/api/admin/summary");
}

export function getAdminMembers() {
  return apiRequest<AdminMember[]>("/api/admin/members");
}

export function createAdminMember(payload: CreateAdminMemberPayload) {
  return apiRequest<AdminMember>("/api/admin/members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function updateAdminMemberStatus(memberId: string, status: AdminMemberStatus) {
  return apiRequest<AdminMember>(`/api/admin/members/${memberId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}

export function updateAdminMemberType(memberId: string, type: AdminMemberType) {
  return apiRequest<AdminMember>(`/api/admin/members/${memberId}/type`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type }),
  });
}

export function updateAdminMemberRole(memberId: string, role: AdminRole) {
  return apiRequest<AdminMember>(`/api/admin/members/${memberId}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });
}

export function deleteAdminMember(memberId: string) {
  return apiRequest<{ message: string }>(`/api/admin/members/${memberId}`, {
    method: "DELETE",
  });
}

export function getAdminRegistrations() {
  return apiRequest<AdminRegistration[]>("/api/admin/registrations");
}

export function updateAdminRegistrationStatus(
  registrationId: string,
  payload: RegistrationStatusUpdatePayload,
) {
  return apiRequest<AdminRegistration>(`/api/admin/registrations/${registrationId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function bulkUpdateAdminRegistrationStatus(payload: {
  registrationIds: string[];
  status: AdminRegistrationStatus;
  reviewer?: string;
  note?: string;
}) {
  return apiRequest<AdminRegistration[]>("/api/admin/registrations/bulk-status", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function deleteAdminRegistration(registrationId: string) {
  return apiRequest<{ message: string }>(`/api/admin/registrations/${registrationId}`, {
    method: "DELETE",
  });
}
