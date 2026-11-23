import { useEffect, useState } from "react";
import {
  Users,
  Package,
  Search,
  LayoutDashboard,
  RefreshCw,
  ClipboardList,
  Check,
  X,
  Handshake,
  Trash2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import {
  getAdminUsers,
  getAdminLostItems,
  getAdminFoundItems,
  updateUserRole,
  updateLostItemStatus,
  updateFoundItemStatus,
  deleteLostItem,
  deleteFoundItem,
  getAdminClaims,
  updateClaimStatus,
  completeClaimHandover,
} from "../services/adminService";

function AdminDashboard() {
  const { user: currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [claims, setClaims] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  async function loadDashboard() {
    setLoading(true);
    setError("");

    try {
      const [usersData, lostData, foundData, claimsData] =
        await Promise.all([
          getAdminUsers(),
          getAdminLostItems(),
          getAdminFoundItems(),
          getAdminClaims(),
        ]);

      setUsers(usersData);
      setLostItems(lostData);
      setFoundItems(foundData);
      setClaims(claimsData);
    } catch (err) {
      setError(err.message || "Could not load admin dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function handleRoleChange(userId, newRole) {
    setError("");
    setSuccess("");
    setActionLoading(`user-${userId}`);

    try {
      await updateUserRole(userId, newRole);

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      setSuccess("User role updated successfully.");
    } catch (err) {
      setError(err.message || "Could not update user role.");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleLostStatusChange(itemId, status) {
    setError("");
    setSuccess("");
    setActionLoading(`lost-${itemId}`);

    try {
      await updateLostItemStatus(itemId, status);

      setLostItems((currentItems) =>
        currentItems.map((item) =>
          item.id === itemId ? { ...item, status } : item
        )
      );

      setSuccess("Lost report status updated successfully.");
    } catch (err) {
      setError(err.message || "Could not update lost report.");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleFoundStatusChange(itemId, status) {
    setError("");
    setSuccess("");
    setActionLoading(`found-${itemId}`);

    try {
      await updateFoundItemStatus(itemId, status);

      setFoundItems((currentItems) =>
        currentItems.map((item) =>
          item.id === itemId ? { ...item, status } : item
        )
      );

      setSuccess("Found report status updated successfully.");
    } catch (err) {
      setError(err.message || "Could not update found report.");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDeleteLostItem(itemId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lost report? This cannot be undone."
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setActionLoading(`delete-lost-${itemId}`);

    try {
      await deleteLostItem(itemId);

      setLostItems((currentItems) =>
        currentItems.filter((item) => item.id !== itemId)
      );

      setSuccess("Lost report deleted successfully.");
    } catch (err) {
      setError(err.message || "Could not delete lost report.");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDeleteFoundItem(itemId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this found report? This cannot be undone."
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setActionLoading(`delete-found-${itemId}`);

    try {
      await deleteFoundItem(itemId);

      setFoundItems((currentItems) =>
        currentItems.filter((item) => item.id !== itemId)
      );

      setSuccess("Found report deleted successfully.");
    } catch (err) {
      setError(err.message || "Could not delete found report.");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleClaimStatus(claimId, status) {
    const action = status === "approved" ? "approve" : "reject";

    if (!window.confirm(`Are you sure you want to ${action} this claim?`)) {
      return;
    }

    setError("");
    setSuccess("");
    setActionLoading(`claim-${claimId}`);

    try {
      await updateClaimStatus(claimId, status);
      await loadDashboard();
      setSuccess(`Claim ${action}d successfully.`);
    } catch (err) {
      setError(err.message || `Could not ${action} claim.`);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleHandover(claimId) {
    if (!window.confirm("Confirm that this item has been handed over?")) {
      return;
    }

    setError("");
    setSuccess("");
    setActionLoading(`handover-${claimId}`);

    try {
      await completeClaimHandover(claimId);
      await loadDashboard();
      setSuccess("Handover recorded successfully.");
    } catch (err) {
      setError(err.message || "Could not record handover.");
    } finally {
      setActionLoading(null);
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "lost", label: "Lost Reports", icon: Search },
    { id: "found", label: "Found Reports", icon: Package },
    { id: "claims", label: "Claims", icon: ClipboardList },
  ];

  if (loading) {
    return <p className="loading-message">Loading admin dashboard...</p>;
  }

  return (
    <main className="page-container admin-page">
      <div className="admin-heading">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage users, reports and claims.</p>
        </div>

        <button
          className="admin-refresh-button"
          onClick={loadDashboard}
          type="button"
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <div className="admin-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "overview" && (
        <section className="admin-stats">
          <div className="admin-stat-card">
            <Users size={25} />
            <h2>{users.length}</h2>
            <p>Registered Users</p>
          </div>

          <div className="admin-stat-card">
            <Search size={25} />
            <h2>{lostItems.length}</h2>
            <p>Lost Reports</p>
          </div>

          <div className="admin-stat-card">
            <Package size={25} />
            <h2>{foundItems.length}</h2>
            <p>Found Reports</p>
          </div>

          <div className="admin-stat-card">
            <ClipboardList size={25} />
            <h2>{claims.length}</h2>
            <p>Total Claims</p>
          </div>
        </section>
      )}

      {activeTab === "users" && (
        <section className="admin-section">
          <h2>Registered Users</h2>

          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>
                        <select
                          value={user.role}
                          disabled={
                            user.id === currentUser?.id ||
                            actionLoading === `user-${user.id}`
                          }
                          onChange={(e) =>
                            handleRoleChange(user.id, e.target.value)
                          }
                        >
                          <option value="student">Student</option>
                          <option value="admin">Admin</option>
                        </select>

                        {user.id === currentUser?.id && " (You)"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {activeTab === "lost" && (
        <section className="admin-section">
          <h2>Lost Item Reports</h2>

          {lostItems.length === 0 ? (
            <p>No lost reports found.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Location</th>
                    <th>Date Lost</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {lostItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.item_name}</td>
                      <td>{item.location}</td>
                      <td>{item.date_lost}</td>
                      <td>
                        <select
                          value={item.status}
                          disabled={actionLoading === `lost-${item.id}`}
                          onChange={(e) =>
                            handleLostStatusChange(item.id, e.target.value)
                          }
                        >
                          <option value="open">Open</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="admin-reject-button"
                          disabled={
                            actionLoading === `delete-lost-${item.id}`
                          }
                          onClick={() => handleDeleteLostItem(item.id)}
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {activeTab === "found" && (
        <section className="admin-section">
          <h2>Found Item Reports</h2>

          {foundItems.length === 0 ? (
            <p>No found reports found.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Location</th>
                    <th>Date Found</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {foundItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.item_name}</td>
                      <td>{item.location}</td>
                      <td>{item.date_found}</td>
                      <td>
                        <select
                          value={item.status}
                          disabled={actionLoading === `found-${item.id}`}
                          onChange={(e) =>
                            handleFoundStatusChange(item.id, e.target.value)
                          }
                        >
                          <option value="available">Available</option>
                          <option value="claimed">Claimed</option>
                          <option value="returned">Returned</option>
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="admin-reject-button"
                          disabled={
                            actionLoading === `delete-found-${item.id}`
                          }
                          onClick={() => handleDeleteFoundItem(item.id)}
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {activeTab === "claims" && (
        <section className="admin-section">
          <h2>Claims Management</h2>

          {claims.length === 0 ? (
            <p>No claims have been submitted yet.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Claim ID</th>
                    <th>User ID</th>
                    <th>Found Item ID</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Handover</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {claims.map((claim) => (
                    <tr key={claim.id}>
                      <td>#{claim.id}</td>
                      <td>{claim.user_id}</td>
                      <td>{claim.found_item_id}</td>
                      <td>{claim.message}</td>
                      <td>{claim.status}</td>
                      <td>
                        {claim.handover_completed
                          ? "Completed"
                          : claim.status === "approved"
                            ? "Waiting"
                            : "Not applicable"}
                      </td>
                      <td>
                        {claim.status === "pending" && (
                          <div className="admin-action-buttons">
                            <button
                              type="button"
                              className="admin-approve-button"
                              disabled={actionLoading === `claim-${claim.id}`}
                              onClick={() =>
                                handleClaimStatus(claim.id, "approved")
                              }
                            >
                              <Check size={15} />
                              Approve
                            </button>

                            <button
                              type="button"
                              className="admin-reject-button"
                              disabled={actionLoading === `claim-${claim.id}`}
                              onClick={() =>
                                handleClaimStatus(claim.id, "rejected")
                              }
                            >
                              <X size={15} />
                              Reject
                            </button>
                          </div>
                        )}

                        {claim.status === "approved" &&
                          !claim.handover_completed && (
                            <button
                              type="button"
                              className="admin-handover-button"
                              disabled={
                                actionLoading === `handover-${claim.id}`
                              }
                              onClick={() => handleHandover(claim.id)}
                            >
                              <Handshake size={15} />
                              Complete handover
                            </button>
                          )}

                        {claim.handover_completed && <span>Completed</span>}

                        {claim.status === "rejected" && (
                          <span>No action available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default AdminDashboard;
