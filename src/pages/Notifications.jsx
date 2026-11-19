import { useEffect, useState } from "react";
import { Bell, Check, CheckCheck } from "lucide-react";
import {
  getNotifications,
  markNotificationRead,
} from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        setError(err.message || "Could not load notifications.");
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  async function handleMarkAsRead(id) {
    setUpdatingId(id);
    setError("");

    try {
      await markNotificationRead(id);

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
      setUpdatingId(null);
    }
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  if (loading) {
    return <p className="loading-message">Loading notifications...</p>;
  }

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