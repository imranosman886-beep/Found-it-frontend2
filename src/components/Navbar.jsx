
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logoutUser();
      setMenuOpen(false);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          Found<span>It</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" className={linkClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/items" className={linkClass} onClick={closeMenu}>
            Browse Items
          </NavLink>

          {user && (
            <>
              <NavLink to="/report-lost" className={linkClass} onClick={closeMenu}>
                Report Lost
              </NavLink>

              <NavLink to="/report-found" className={linkClass} onClick={closeMenu}>
                Report Found
              </NavLink>

              <NavLink to="/my-reports" className={linkClass} onClick={closeMenu}>
                My Reports
              </NavLink>

              <NavLink to="/my-claims" className={linkClass} onClick={closeMenu}>
                My Claims
              </NavLink>

              <NavLink to="/profile" className={linkClass} onClick={closeMenu}>
                My Profile
              </NavLink>

              <NavLink to="/notifications" className={linkClass} onClick={closeMenu}>
                <Bell size={17} /> Notifications
              </NavLink>
            </>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass} onClick={closeMenu}>
              Admin
            </NavLink>
          )}

          {!user ? (
            <div className="nav-actions">
              <Link to="/login" className="login-link" onClick={closeMenu}>
                Login
              </Link>

              <Link to="/signup" className="signup-button" onClick={closeMenu}>
                Get Started
              </Link>
            </div>
          ) : (
            <div className="nav-actions">
              <button className="logout-button" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
