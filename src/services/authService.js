import apiRequest from "./api";

export async function checkSession() {
  return apiRequest("/api/auth/session");
}

export async function login(email, password) {
  const data = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.token || data.access_token) {
    localStorage.setItem("token", data.token || data.access_token);
  }
  return data;
}

export async function signup(email, password) {
  return apiRequest("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  localStorage.removeItem("token");
  return apiRequest("/api/auth/logout", {
    method: "POST",
  }).catch(() => ({}));
}
