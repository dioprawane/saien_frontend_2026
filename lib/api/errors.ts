import { ApiClientError } from "@/lib/api/client";

type ApiValidationError = {
  field?: string;
  message?: string;
};

export function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (!(error instanceof ApiClientError)) {
    return fallbackMessage;
  }

  if (
    error.details &&
    typeof error.details === "object" &&
    "errors" in error.details &&
    Array.isArray((error.details as { errors?: unknown }).errors)
  ) {
    const firstValidationError = ((error.details as { errors: ApiValidationError[] }).errors ?? [])[0];
    if (firstValidationError?.message) {
      return firstValidationError.message;
    }
  }

  return error.message || fallbackMessage;
}
