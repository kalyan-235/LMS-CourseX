import { useState } from "react";

export default function CourseFilter({
  onFilter,
  categories = [],
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("");
  const [priceRange, setPriceRange] =
    useState([0, 1000]);
  const [rating, setRating] = useState(0);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    onFilter({
      search: query,
      category: selectedCategory,
      priceRange,
      rating,
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilter({
      search,
      category,
      priceRange,
      rating,
    });
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onFilter({
      search,
      category: selectedCategory,
      priceRange,
      rating: newRating,
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setPriceRange([0, 1000]);
    setRating(0);
    onFilter({
      search: "",
      category: "",
      priceRange: [0, 1000],
      rating: 0,
    });
  };

  return (
    <div className="course-filter-sidebar">
      <div className="filter-section">
        <h3>Search</h3>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={handleSearch}
          className="filter-input"
        />
      </div>

      <div className="filter-section">
        <h3>Category</h3>
        <div className="filter-categories">
          <button
            className={`filter-tag ${
              selectedCategory === ""
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleCategoryChange("")
            }
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tag ${
                selectedCategory === cat
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleCategoryChange(cat)
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Rating</h3>
        <div className="filter-ratings">
          {[5, 4, 3, 2, 1, 0].map((r) => (
            <button
              key={r}
              className={`filter-rating ${
                rating === r ? "active" : ""
              }`}
              onClick={() =>
                handleRatingChange(r)
              }
            >
              {r > 0 ? (
                <>
                  {"⭐".repeat(r)}
                  <span>& up</span>
                </>
              ) : (
                "All Ratings"
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn btn-secondary btn-block"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}
