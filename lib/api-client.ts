export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

function safeMessage(payload: any): string | null {
  if (!payload) return null;
  if (typeof payload === "string") return payload;
  return (
    payload.message ||
    payload.error ||
    (payload.success === false ? payload.message || payload.error : null) ||
    null
  );
}

/**
 * Advanced API helper for client components:
 * - sends JSON by default when body is provided
 * - parses JSON responses (when possible)
 * - throws ApiError with status + payload on non-2xx
 */
export async function apiFetch<T = any>(
  url: string,
  opts: ApiFetchOptions = {}
): Promise<T> {
  const headers = new Headers(opts.headers);

  let body: BodyInit | undefined;
  if (opts.body !== undefined) {
    headers.set("Content-Type", headers.get("Content-Type") || "application/json");
    body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, {
    ...opts,
    headers,
    body,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  const payload = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    const msg = safeMessage(payload) || `Request failed (${res.status})`;
    throw new ApiError(msg, res.status, payload);
  }

  return payload as T;
}

