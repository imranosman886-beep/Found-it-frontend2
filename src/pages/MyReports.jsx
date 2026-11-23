
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Search, MapPin } from "lucide-react";
import {
  getMyLostItems,
  getMyFoundItems,
} from "../services/itemService";
import { useAuth } from "../context/AuthContext";

function MyReports() {
  const { user } = useAuth();

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      try {
        const [lost, found] = await Promise.all([
          getMyLostItems(user.id),
          getMyFoundItems(user.id),
        ]);

        setLostItems(lost);
        setFoundItems(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      loadReports();
    }
  }, [user]);

  const reports = [
    ...lostItems.map((item) => ({ ...item, type: "Lost" })),
    ...foundItems.map((item) => ({ ...item, type: "Found" })),
  ].sort((a, b) => b.id - a.id);

  const filteredReports =
    activeTab === "all"
      ? reports
      : reports.filter((item) => item.type.toLowerCase() === activeTab);

  if (loading && user?.id) {
  return <p className="loading-message">Loading your reports...</p>;
}

if (!user?.id) {
  return <p className="loading-message">Please log in to view your reports.</p>;
}

  return (
    <div className="page-container my-reports-page">
      <div className="my-reports-heading">
        <div>
          <span>YOUR ACTIVITY</span>
          <h1>My Reports</h1>
          <p>Keep track of the items you have reported.</p>
        </div>

        <div className="my-reports-actions">
          <Link to="/report-lost" className="btn btn-secondary">
            Report Lost
          </Link>
          <Link to="/report-found" className="btn btn-primary">
            Report Found
          </Link>
        </div>
      </div>

      <div className="reports-tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Reports ({reports.length})
        </button>

        <button
          className={activeTab === "lost" ? "active" : ""}
          onClick={() => setActiveTab("lost")}
        >
          Lost ({lostItems.length})
        </button>

        <button
          className={activeTab === "found" ? "active" : ""}
          onClick={() => setActiveTab("found")}
        >
          Found ({foundItems.length})
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}

      {filteredReports.length === 0 ? (
        <div className="reports-empty">
          <Package size={45} />
          <h2>No reports found</h2>
          <p>Your lost and found reports will appear here.</p>
          <Link to="/report-lost" className="btn btn-primary">
            Create Your First Report
          </Link>
        </div>
      ) : (
        <div className="my-reports-grid">
          {filteredReports.map((item) => (
            <div className="my-report-card" key={`${item.type}-${item.id}`}>
              <div className="my-report-image">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.item_name} />
                ) : (
                  <Package size={42} />
                )}
              </div>

              <div className="my-report-content">
                <span
                  className={`report-type ${item.type.toLowerCase()}`}
                >
                  {item.type} Item
                </span>

                <h3>{item.item_name}</h3>

                <p>{item.description}</p>

                <div className="my-report-location">
                  <MapPin size={15} />
                  {item.location}
                </div>

                <div className="my-report-footer">
                  <span className="report-status">
                    {item.status}
                  </span>

                  <Link
                    to={`/items/${item.id}`}
                    className="view-report-link"
                  >
                    View Details <Search size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReports;
