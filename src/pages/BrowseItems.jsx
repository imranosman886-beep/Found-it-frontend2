
import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import {
  getFoundItems,
  getLostItems,
} from "../services/itemService";
import { getCategories } from "../services/categoryService";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import ItemGrid from "../components/ItemGrid";
import Loading from "../components/Loading";

function BrowseItems() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("found");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Could not load categories:", err);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadItems() {
      setLoading(true);
      setError("");

      try {
        const filters = {
          page,
          per_page: 9,
          search,
          category_id: selectedCategory === "all" ? "" : selectedCategory,
        };

        let data;

        if (selectedType === "lost") {
          data = await getLostItems(filters);
        } else if (selectedType === "found") {
          data = await getFoundItems(filters);
        } else {
          const [lostData, foundData] = await Promise.all([
            getLostItems(filters),
            getFoundItems(filters),
          ]);

          const combinedItems = [
            ...(lostData.items || []).map((item) => ({
              ...item,
              report_type: "lost",
            })),
            ...(foundData.items || []).map((item) => ({
              ...item,
              report_type: "found",
            })),
          ];

          data = {
            items: combinedItems,
            pages: Math.max(lostData.pages || 1, foundData.pages || 1),
          };
        }

        setItems(
          (data.items || []).map((item) => ({
            ...item,
            report_type: item.report_type || selectedType,
          }))
        );
        setPages(data.pages || 1);
      } catch (err) {
        setError(err.message || "Could not load items.");
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [page, search, selectedCategory, selectedType]);

  function handleSearch() {
    setPage(1);
    setSearch(searchInput.trim());
  }

  function handleCategoryChange(value) {
    setPage(1);
    setSelectedCategory(value);
  }

  function handleTypeChange(value) {
    setPage(1);
    setSelectedType(value);
  }

  return (
    <div className="browse-page">
      <section className="browse-heading">
        <span>FOUNDIT COLLECTION</span>
        <h1>Browse Items</h1>
        <p>
          Search through lost and found reports to help belongings
          find their way home.
        </p>

        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearch}
          placeholder="Search for an item..."
        />

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
        />
      </section>

      <section className="browse-results">
        <div className="results-heading">
          <h2>
            {selectedType === "all"
              ? "All Items"
              : selectedType === "lost"
                ? "Lost Items"
                : "Found Items"}
          </h2>
          <span>{items.length} items on this page</span>
        </div>

        {loading && <Loading message="Loading items..." />}

        {!loading && error && (
          <p className="browse-error">{error}</p>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="empty-items">
            <Package size={45} />
            <h3>No items found</h3>
            <p>Try changing your search or filters.</p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <ItemGrid
            items={items}
            type={selectedType === "all" ? "found" : selectedType}
          />
        )}

        {!loading && !error && pages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setPage((current) => current - 1)}
              disabled={page === 1}
            >
              Previous
            </button>

            <span>
              Page {page} of {pages}
            </span>

            <button
              onClick={() => setPage((current) => current + 1)}
              disabled={page === pages}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default BrowseItems;