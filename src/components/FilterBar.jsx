
function FilterBar({
  categories = [],
  selectedCategory,
  onCategoryChange,
  selectedType = "all",
  onTypeChange,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="item-type">Item type</label>
        <select
          id="item-type"
          value={selectedType}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          <option value="all">All items</option>
          <option value="lost">Lost items</option>
          <option value="found">Found items</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="item-category">Category</label>
        <select
          id="item-category"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
