
// Import the apiRequest function from the api.js file
import apiRequest from "./api";

// Function 1 - Get notifications for the currently logged-in user
export function getNotifications() {
  return apiRequest("/api/notifications");
}

// Function 2 - Mark a specific notification from unread to read
export function markNotificationRead(notificationId) {

  // We use ('. . .') to insert the exact notification ID into the URL
  return apiRequest(`/api/notifications/${notificationId}/read`, {

    // We use PATCH because we are only updating one small part (is_read) of an existing record in the database.
    method: "PATCH",
  });
}
=======

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
