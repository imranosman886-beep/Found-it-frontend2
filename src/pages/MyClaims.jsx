
// IMPORTS - brings in tools we need
import { useEffect, useState } from "react"; // React hooks for memory (useState) and running code on load (useEffect)
import { Link } from "react-router-dom"; //Used to navigate to other pages without refreshing page
import {
  ClipboardList,
  Package,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"; // Icons to make the UI look cleaner and more user-friendly
import { getMyClaims } from "../services/claimService"; // Function to fetch the user's claims from the backend


function MyClaims() {
  // State variables that automatically update the page when they change
  const [claims, setClaims] = useState([]);         // Holds the list of claims from backend (starts empty)  
  const [loading, setLoading] = useState(true);     // True while we are waiting for the backend to respond, false when we have the data
  const [error, setError] = useState("");           // Holds any error messages if the backend request fails
  const [activeTab, setActiveTab] = useState("all");// Tracks which tab is currently selected (all, pending, approved, rejected)


  // Fetch the user's claims from the backend when the page loads
  useEffect(() => {
    async function loadClaims() {
      try {

        // Ask the backend for the user's claims
        const data = await getMyClaims();
        // Check to make sure 'data' is actually a list (array) before we try to use (save) it. If it's not, we set claims to an empty list.
        setClaims(Array.isArray(data) ? data : []);
      } catch (err) {
        // If the request fails, we show an error message to the user
        setError(err.message || "Could not load your claims.");
      } finally {
        // Whether the request succeeds or fails, we stop showing the loading message
        setLoading(false);
      }
    }

    //Call the function we just defined to fetch the claims from the backend
    loadClaims(); 
  }, []); // empty brackets [] mean: "only run this code once, when the page first loads"

  // Filtering - decide which claims to show based on the selected tab (all, pending, approved, rejected)
  const filteredClaims =
    activeTab === "all"
      ? claims // If the "all" tab is selected, show all claims
      : claims.filter((claim) => claim.status === activeTab); // If not "all", only show claims that match the selected status

  // Helper function to return the correct icon based on the claim's status
  function getStatusIcon(status) {
    if (status === "approved") return <CheckCircle size={16} />; // Green check mark for approved claims
    if (status === "rejected") return <XCircle size={16} />; // Red X for rejected claims
    return <Clock size={16} />; // Clock icon for pending claims
  }

  // If still fetching data from the backend, show a loading message to the user
  if (loading) {
    return <p className="loading-message">Loading your claims...</p>;
  }

  // Render the page
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
