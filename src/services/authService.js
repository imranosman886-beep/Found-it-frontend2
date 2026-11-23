
import apiRequest from "./api";

export function signup(email, password) {
  return apiRequest("/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function login(email, password) {
  return apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function checkSession() {
  return apiRequest("/check_session");
}

export function logout() {
  return apiRequest("/logout", {
    method: "DELETE",
  });
}
