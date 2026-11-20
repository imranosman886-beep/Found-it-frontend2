
import apiRequest from "./api";

// USERS
export function getAdminUsers() {
  return apiRequest("/api/admin/users");
}

export function updateUserRole(userId, role) {
  return apiRequest(`/api/admin/users/${userId}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
}

// LOST ITEMS
export function getAdminLostItems() {
  return apiRequest("/api/admin/lost-items");
}

export function updateLostItemStatus(itemId, status) {
  return apiRequest(`/api/admin/lost-items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteLostItem(itemId) {
  return apiRequest(`/api/admin/lost-items/${itemId}`, {
    method: "DELETE",
  });
}

// FOUND ITEMS
export function getAdminFoundItems() {
  return apiRequest("/api/admin/found-items");
}

export function updateFoundItemStatus(itemId, status) {
  return apiRequest(`/api/admin/found-items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteFoundItem(itemId) {
  return apiRequest(`/api/admin/found-items/${itemId}`, {
    method: "DELETE",
  });
}

// CLAIMS
export function getAdminClaims() {
  return apiRequest("/api/claims");
}

export function updateClaimStatus(claimId, status) {
  return apiRequest(`/api/claims/${claimId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function completeClaimHandover(claimId) {
  return apiRequest(`/api/claims/${claimId}/handover`, {
    method: "POST",
  });
}
