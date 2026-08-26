import { useAuthStore } from "../../entities/session/model/sessionStore";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  isRetry = false,
): Promise<T> {
  const token = useAuthStore.getState().accessToken;
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options?.headers,
    },
  });
  if (res.status === 401 && !isRetry) {
    const refreshResponse = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      useAuthStore.getState().setAccessToken(data.accessToken);
      return apiFetch<T>(path, options, !isRetry);
    }
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}
