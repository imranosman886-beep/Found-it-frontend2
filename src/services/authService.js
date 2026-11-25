
import apiRequest from "./api";

export function signup({
  full_name,
  email,
  contact_email,
  institutional_id,
  university_code,
  account_type,
  password,
}) {
  return apiRequest("/signup", {
    method: "POST",
    body: JSON.stringify({
      full_name,
      email,
      contact_email,
      institutional_id,
      university_code,
      account_type,
      password,
    }),
  });
}

export function login(identifier, password, isAdmin = false) {
  return apiRequest("/login", {
    method: "POST",
    body: JSON.stringify(
      isAdmin
        ? { email: identifier, password }
        : { institutional_id: identifier, password }
    ),
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
