import apiRequest from "./api";

// Get notifications for the logged-in user
export function getNotifications() {
  return apiRequest("/api/notifications");
}

// Mark a notification as read
export function markNotificationRead(notificationId) {
  return apiRequest(`/api/notifications/${notificationId}/read`, {
    method: "PATCH",
  });
}