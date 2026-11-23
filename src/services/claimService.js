// Import main helper function for making API requests (handles fetch, headers and login token)
import apiRequest from "./api";

// Function 1 - send a new claim to the backend when a user wants to claim a found item
export async function createClaim(found_item_id, message) {
  return apiRequest("/api/claims", {
    method: "POST",
    body: JSON.stringify({
      found_item_id,
      message,
    }),
  });
}

// Function 2 - fetch all claims submitted by the currently logged-in user
export async function getMyClaims() {
  return apiRequest("/api/claims/my");
}