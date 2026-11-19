import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  Package,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { getMyClaims } from "../services/claimService";

function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function loadClaims() {
      try {
        const data = await getMyClaims();
        setClaims(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Could not load your claims.");
      } finally {
        setLoading(false);
      }
    }

    loadClaims();
  }, []);

  const filteredClaims =
    activeTab === "all"
      ? claims
      : claims.filter((claim) => claim.status === activeTab);

  function getStatusIcon(status) {
    if (status === "approved") return <CheckCircle size={16} />;
    if (status === "rejected") return <XCircle size={16} />;
    return <Clock size={16} />;
  }

  if (loading) {
    return <p className="loading-message">Loading your claims...</p>;
  }

  return (
    <main className="page-container my-claims-page">
      <div className="my-claims-heading">
        <div>
          <span>YOUR ACTIVITY</span>
          <h1>My Claims</h1>
          <p>Track the progress of items you have claimed.</p>
        </div>

        <Link to="/items" className="btn btn-primary">
          Browse Found Items
        </Link>
      </div>

      <div className="claims-tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Claims ({claims.length})
        </button>

        <button
          className={activeTab === "pending" ? "active" : ""}
          onClick={() => setActiveTab("pending")}
        >
          Pending ({claims.filter((c) => c.status === "pending").length})
        </button>

        <button
          className={activeTab === "approved" ? "active" : ""}
          onClick={() => setActiveTab("approved")}
        >
          Approved ({claims.filter((c) => c.status === "approved").length})
        </button>

        <button
          className={activeTab === "rejected" ? "active" : ""}
          onClick={() => setActiveTab("rejected")}
        >
          Rejected ({claims.filter((c) => c.status === "rejected").length})
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}

      {filteredClaims.length === 0 ? (
        <div className="claims-empty">
          <ClipboardList size={45} />
          <h2>No claims found</h2>
          <p>
            When you submit a claim for a found item, it will appear here.
          </p>
          <Link to="/items" className="btn btn-primary">
            Browse Found Items
          </Link>
        </div>
      ) : (
        <div className="claims-list">
          {filteredClaims.map((claim) => (
            <article className="claim-card" key={claim.id}>
              <div className="claim-card-icon">
                <Package size={30} />
              </div>

              <div className="claim-card-content">
                <div className="claim-card-top">
                  <h3>Claim #{claim.id}</h3>

                  <span className={`claim-status ${claim.status}`}>
                    {getStatusIcon(claim.status)}
                    {claim.status}
                  </span>
                </div>

                <p className="claim-message">{claim.message}</p>

                <p className="claim-item-id">
                  Found Item ID: {claim.found_item_id}
                </p>

                {claim.status === "approved" && (
                  <div className="claim-handover">
                    {claim.handover_completed ? (
                      <span className="handover-complete">
                        <CheckCircle size={16} />
                        Item handover completed
                      </span>
                    ) : (
                      <span className="handover-pending">
                        <Clock size={16} />
                        Waiting for item handover
                      </span>
                    )}
                  </div>
                )}

                <Link
                  to={`/items/${claim.found_item_id}`}
                  className="claim-view-link"
                >
                  View Found Item <MapPin size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyClaims;