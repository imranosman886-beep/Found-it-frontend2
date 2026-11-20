import apiRequest from "./api";

export async function createClaim(found_item_id, message) {
  return apiRequest("/api/claims", {
    method: "POST",
    body: JSON.stringify({
      found_item_id,
      message,
    }),
  });
}

export async function getMyClaims() {
  return apiRequest("/api/claims/my");
}