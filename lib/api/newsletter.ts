import { apiRequest } from "@/lib/api/client";

type ApiMessage = { message: string };

export type NewsletterSubscriber = {
  id: string;
  email: string;
  source: string | null;
  subscribedAt: string;
};

export function subscribeToNewsletter(email: string, source?: string) {
  return apiRequest<ApiMessage>("/api/newsletter/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: source ?? "homepage" }),
  });
}

export function getAdminNewsletterSubscribers() {
  return apiRequest<NewsletterSubscriber[]>("/api/admin/newsletter");
}

export function deleteNewsletterSubscriber(email: string) {
  return apiRequest<ApiMessage>(`/api/admin/newsletter/${encodeURIComponent(email)}`, {
    method: "DELETE",
  });
}
