import api from "@/services/api";

export function saveAuthorization(token: string) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function cleanAuthorization() {
  api.defaults.headers.Authorization = null;
}

export async function checkAuthUserService() {
  try {
    await api.get("/auth/check");

    return true;
  } catch {
    return false;
  }
}
