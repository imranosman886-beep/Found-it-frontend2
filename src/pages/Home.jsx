
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  Users,
  HeartHandshake,
  ArrowRight,
  Package,
  MapPin,
} from "lucide-react";
import { getFoundItems } from "../services/itemService";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedItems() {
      try {
        const data = await getFoundItems({ page: 1, per_page: 3 });
        setItems(data.items || []);
      } catch (error) {
        console.error("Could not load featured items:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedItems();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">WELCOME TO FOUNDIT</span>

          <h1>
            Lost something?
            <br />
            <span>Let's find it together.</span>
          </h1>

          <p>
            FoundIt helps people report lost belongings, share found items,
            and reconnect owners with the things that matter.
          </p>

          <div className="hero-buttons">
            <Link to="/items" className="btn btn-primary">
              Browse Items <ArrowRight size={18} />
            </Link>

            <Link to="/report-found" className="btn btn-secondary">
              Report Found Item
            </Link>
          </div>

          <div className="hero-trust">
            <ShieldCheck size={19} />
            <span>A community helping belongings find their way home.</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-icon">
            <Search size={90} strokeWidth={1.3} />
          </div>

          <div className="floating-card">
            <ShieldCheck size={22} />
            <div>
              <strong>Safe and simple</strong>
              <p>Helping belongings find their way home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="featured-section">
        <div className="section-heading">
          <span>RECENTLY FOUND</span>
          <h2>Items waiting to be reunited</h2>
          <p>
            Browse recently reported items and see if something belongs to you.
          </p>
        </div>

        {loading ? (
          <p className="featured-message">Loading recently found items...</p>
        ) : items.length === 0 ? (
          <div className="featured-empty">
            <Package size={38} />
            <h3>No found items yet</h3>
            <p>When people report found items, they will appear here.</p>
            <Link to="/report-found" className="btn btn-primary">
              Report a Found Item
            </Link>
          </div>
        ) : (
          <div className="featured-grid">
            {items.map((item) => (
              <Link
                to={`/items/${item.id}`}
                className="featured-card"
                key={item.id}
              >
                <div className="featured-image">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.item_name} />
                  ) : (
                    <Package size={48} />
                  )}
                </div>

                <div className="featured-info">
                  <span className="featured-category">
                    {item.category || "Other"}
                  </span>
                  <h3>{item.item_name}</h3>
                  <p className="featured-location">
                    <MapPin size={15} />
                    {item.location}
                  </p>
                  <span className="featured-link">
                    View details <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="featured-browse">
          <Link to="/items" className="btn btn-secondary">
            Browse All Items <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="features-section">
        <div className="section-heading">
          <span>HOW FOUNDIT WORKS</span>
          <h2>Making lost things found again</h2>
          <p>
            Three simple steps to help reconnect people with their belongings.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Search size={28} />
            </div>
            <h3>Browse Items</h3>
            <p>Look through items that have been reported as found.</p>
            <Link to="/items">
              Explore items <ArrowRight size={16} />
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Users size={28} />
            </div>
            <h3>Report an Item</h3>
            <p>Report something you've lost or an item you've found.</p>
            <Link to="/report-lost">
              Get started <ArrowRight size={16} />
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <HeartHandshake size={28} />
            </div>
            <h3>Reconnect</h3>
            <p>Submit a claim and help return belongings to their owners.</p>
            <Link to="/items">
              Find an item <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="home-cta">
        <h2>Have you found something?</h2>
        <p>
          Help someone recover their belongings. Report the item on FoundIt.
        </p>
        <Link to="/report-found" className="btn btn-primary">
          Report a Found Item <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}

export default Home;
