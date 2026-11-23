
import ItemCard from "./ItemCard";

function ItemGrid({ items = [], type = "found" }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h3>No items found</h3>
        <p>Try searching for something else.</p>
      </div>
    );
  }

  return (
    <div className="item-grid">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          type={type}
        />
      ))}
    </div>
  );
}

export default ItemGrid;
