import { apiRequest } from "@/lib/api/client";

export type ContactSubject = "Adhésion" | "Partenariat" | "Presse" | "Autre";

export type ContactMessagePayload = {
  fullName: string;
  email: string;
  subject: ContactSubject;
  message: string;
};

export type ContactMessageResponse = {
  id: string;
  fullName: string;
  email: string;
  subject: ContactSubject;
  message: string;
  processed: boolean;
  createdAt: string;
  processedAt: string | null;
};

export function sendContactMessage(payload: ContactMessagePayload) {
  return apiRequest<ContactMessageResponse>("/api/contact/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
