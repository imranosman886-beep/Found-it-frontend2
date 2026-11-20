import { User, Mail, Shield, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <p className="loading-message">Loading profile...</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <User size={40} />
        </div>

        <h1>My Profile</h1>
        <p className="profile-subtitle">
          Manage and view your account information.
        </p>

        <div className="profile-details">
          <div className="profile-detail">
            <Mail size={20} />
            <div>
              <span>Email Address</span>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-detail">
            <Shield size={20} />
            <div>
              <span>Account Role</span>
              <p>{user.role}</p>
            </div>
          </div>

          <div className="profile-detail">
            <Calendar size={20} />
            <div>
              <span>User ID</span>
              <p>{user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;