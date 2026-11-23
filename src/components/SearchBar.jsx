
import { Search } from "lucide-react";

function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search for an item.....",
}) {
  function handleSubmit(event) {
    event.preventDefault();
    if (onSearch) onSearch(value);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Search size={20} />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
