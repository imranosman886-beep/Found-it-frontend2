
// IMPORTS - brings in tools we need
import { useEffect, useState } from "react";
import { Bell, Check, CheckCheck } from "lucide-react";
import {
  getNotifications,
  markNotificationRead,
} from "../services/notificationService"; // Import our notification API functions

function Notifications() {

  // STATE (Memory) - these variables will automatically update the page when they change
  const [notifications, setNotifications] = useState([]); // Holds the list of notifications from backend (starts empty)
  const [loading, setLoading] = useState(true);           // True while we are waiting for the backend to respond, false when we have the data
  const [error, setError] = useState("");               // Holds any error messages if the backend request fails
  const [updatingId, setUpdatingId] = useState(null);   // Holds the ID of the notification currently being marked as read (to show a loading state for that specific notification)

  // Fetch the user's notifications from the backend when the page loads
  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await getNotifications(); // getNotifications() is a function we defined in notificationService.js that fetches the user's notifications from the backend
        setNotifications(data); // Save the notifications to state so the page can display them
      } catch (err) {
        setError(err.message || "Could not load notifications.");
      } finally {
        setLoading(false); // Whether the request succeeds or fails, we stop showing the loading message (turn off loading)
      }
    }

    // Call the function we just defined to fetch the notifications from the backend
    loadNotifications();
  }, []); // empty brackets [] mean: "only run this code once, when the page first loads"

  // Function to mark a notification as read when the user clicks the "Mark as read" button
  async function handleMarkAsRead(id) {
    setUpdatingId(id); // Show "Updating..." when the user clicks the button for this specific notification
    setError(""); // Clear any previous error messages before we try to update the notification

    try {
      // Call the markNotificationRead() function we defined in notificationService.js to update the notification in the backend (database)
      await markNotificationRead(id);

      //Update the screeen immediately without reloading the page
      //Loop through current notifications; if ID matches the one we just marked as read, update its is_read property to true. Otherwise, leave it unchanged.
      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (err) {
      setError(err.message || "Could not update notification."); 
    } finally {
      setUpdatingId(null); // Reset button back to normal (not updating) after the request is done, whether it succeeded or failed
    }
  }

  // Count how many notifications are unread so we can display it in the heading
  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  // If still fetching data from the backend, show a loading message to the user
  if (loading) {
    return <p className="loading-message">Loading notifications...</p>;
  }

  // Render the page
  return (
    <main className="page-container notifications-page">
      <div className="notifications-heading">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated on activity related to your reports and claims.</p>
        </div>

        <div className="notification-count">
          <Bell size={20} />
          <span>{unreadCount} unread</span>
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      {notifications.length === 0 ? (
        <div className="notifications-empty">
          <Bell size={38} />
          <h2>No notifications yet</h2>
          <p>When there's an update, you'll see it here.</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <article
              key={notification.id}
              className={`notification-card ${
                notification.is_read ? "read" : "unread"
              }`}
            >
              <div className="notification-icon">
                {notification.is_read ? (
                  <CheckCheck size={21} />
                ) : (
                  <Bell size={21} />
                )}
              </div>

              <div className="notification-content">
                <p>{notification.message}</p>

                <span className="notification-status">
                  {notification.is_read ? "Read" : "Unread"}
                </span>
              </div>

              {!notification.is_read && (
                <button
                  type="button"
                  className="mark-read-button"
                  onClick={() => handleMarkAsRead(notification.id)}
                  disabled={updatingId === notification.id}
                >
                  <Check size={16} />
                  {updatingId === notification.id
                    ? "Updating..."
                    : "Mark as read"}
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Notifications;
