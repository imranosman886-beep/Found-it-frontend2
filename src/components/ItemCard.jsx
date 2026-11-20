
import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";

function ItemCard({ item, type = "found" }) {
  const itemId = item.id;
  const itemName = item.item_name || "Unnamed item";
  const location = item.location || "Location not provided";

  const itemType = item.report_type || type;
  const isLost = itemType === "lost";
  const date = isLost ? item.date_lost : item.date_found;

  return (
    <Link
      to={`/items/${itemId}?type=${itemType}`}
      className="item-card"
    >
      <div className="item-card-image">
        {item.image_url ? (
          <img src={item.image_url} alt={itemName} />
        ) : (
          <div className="item-card-placeholder">
            No image available
          </div>
        )}
      </div>

      <div className="item-card-content">
        <div className="item-card-heading">
          <h3>{itemName}</h3>
          <span className={`item-status ${item.status}`}>
            {item.status || "Available"}
          </span>
        </div>

        <p className="item-card-description">
          {item.description || "No description provided."}
        </p>

        <div className="item-card-meta">
          <span>
            <MapPin size={15} />
            {location}
          </span>

          <span>
            <Calendar size={15} />
            {date || "Date not provided"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
