import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  Clock,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import Loading from "../components/Loading";
import API from "../api/axios";

// ── Category chip data with emoji icons ─────────────────────
const CATEGORIES = [
  { value: "all",            label: "All",            emoji: "🌐" },
  { value: "Web Development",label: "Web Dev",        emoji: "💻" },
  { value: "Frontend",       label: "Frontend",       emoji: "🎨" },
  { value: "Backend",        label: "Backend",        emoji: "⚙️" },
  { value: "Data Science",   label: "Data Science",   emoji: "📊" },
  { value: "Programming",    label: "Programming",    emoji: "🐍" },
  { value: "Design",         label: "Design",         emoji: "✏️" },
  { value: "DevOps",         label: "DevOps",         emoji: "🚀" },
  { value: "Cloud",          label: "Cloud",          emoji: "☁️" },
  { value: "Mobile",         label: "Mobile",         emoji: "📱" },
  { value: "Cybersecurity",  label: "Security",       emoji: "🔒" },
  { value: "Database",       label: "Database",       emoji: "🗄️" },
];

const SORT_OPTIONS = [
  { value: "",          label: "Most Popular" },
  { value: "latest",    label: "Latest First" },
  { value: "priceLow",  label: "Price: Low → High" },
  { value: "priceHigh", label: "Price: High → Low" },
];

const COURSES_PER_PAGE = 9;

export default function Explore() {
  const [courses, setCourses]               = useState([]);
  const [loading, setLoading]               = useState(true);
  const [search, setSearch]                 = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory]             = useState("all");
  const [sort, setSort]                     = useState("");
  const [currentPage, setCurrentPage]       = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const debounceTimer = useRef(null);
  const searchRef     = useRef(null);

  // ── debounced search ────────────────────────────────────────
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(val);
      setCurrentPage(1);
    }, 400);
  };

  // ── fetch ────────────────────────────────────────────────────
  useEffect(() => {
    fetchCourses();
  }, [debouncedSearch, category, sort]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/courses?search=${debouncedSearch}&category=${
          category === "all" ? "" : category
        }&sort=${sort}`
      );
      setCourses(res.data || []);
      setCurrentPage(1);
    } catch {
      window.addToast?.("Failed to load courses", "error");
    } finally {
      setLoading(false);
    }
  };

  // ── clear all filters ───────────────────────────────────────
  const clearAll = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategory("all");
    setSort("");
    setCurrentPage(1);
  };

  const hasFilters = search || category !== "all" || sort;

  // ── pagination ──────────────────────────────────────────────
  const totalPages     = Math.ceil(courses.length / COURSES_PER_PAGE);
  const paginatedCourses = courses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="explore-page">

      {/* ── HERO BANNER ──────────────────────────────────────── */}
      <section className="explore-hero">
        <div className="explore-hero-inner">
          <div className="explore-hero-badge">
            <TrendingUp size={14} />
            {courses.length}+ Courses Available
          </div>
          <h1 className="explore-hero-title">
            Find Your Next
            <span className="explore-hero-gradient"> Learning Adventure</span>
          </h1>
          <p className="explore-hero-subtitle">
            Explore expert-curated courses in tech, design, data science and more.
            Learn at your own pace, earn certificates.
          </p>

          {/* ── SEARCH BAR ─────────────────────────────────── */}
          <div className="explore-search-bar">
            <Search size={18} className="explore-search-icon" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search courses, topics, skills…"
              value={search}
              onChange={handleSearchChange}
              className="explore-search-input"
              autoComplete="off"
            />
            {search && (
              <button
                className="explore-search-clear"
                onClick={() => { setSearch(""); setDebouncedSearch(""); }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* decorative orbs */}
        <div className="explore-orb explore-orb-1" />
        <div className="explore-orb explore-orb-2" />
      </section>

      {/* ── FILTER BAR ───────────────────────────────────────── */}
      <section className="explore-filter-bar">
        <div className="explore-filter-inner">

          {/* Category chips */}
          <div className="explore-category-chips">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                className={`explore-chip ${category === cat.value ? "explore-chip--active" : ""}`}
                onClick={() => { setCategory(cat.value); setCurrentPage(1); }}
              >
                <span className="explore-chip-emoji">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="explore-filter-controls">
            {/* Sort select */}
            <div className="explore-sort-wrap">
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }}
                className="explore-sort-select"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Clear filters */}
            {hasFilters && (
              <button className="explore-clear-btn" onClick={clearAll}>
                <X size={14} />
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── RESULTS AREA ─────────────────────────────────────── */}
      <section className="explore-results">

        {/* Results count + active filters */}
        {!loading && (
          <div className="explore-results-meta">
            <span className="explore-results-count">
              <strong>{courses.length}</strong> course{courses.length !== 1 ? "s" : ""}
              {category !== "all" && <> in <em>{category}</em></>}
              {search && <> matching "<em>{search}</em>"</>}
            </span>
            {hasFilters && (
              <button className="explore-results-clear" onClick={clearAll}>
                Reset all filters
              </button>
            )}
          </div>
        )}

        {/* Course grid */}
        {loading ? (
          <div className="explore-loading-wrap">
            <Loading fullPage={false} />
          </div>
        ) : courses.length === 0 ? (
          <div className="explore-empty">
            <div className="explore-empty-icon">🔍</div>
            <h3>No courses found</h3>
            <p>Try a different keyword or browse all categories</p>
            <button className="explore-empty-btn" onClick={clearAll}>
              Browse All Courses
            </button>
          </div>
        ) : (
          <>
            <div className="explore-course-grid">
              {paginatedCourses.map((course) => (
                <ExploreCourseCard key={course._id} course={course} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="explore-pagination">
                <button
                  className="explore-page-btn explore-page-btn--nav"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "..." ? (
                      <span key={`ellipsis-${i}`} className="explore-page-dots">…</span>
                    ) : (
                      <button
                        key={p}
                        className={`explore-page-btn ${currentPage === p ? "explore-page-btn--active" : ""}`}
                        onClick={() => goToPage(p)}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  className="explore-page-btn explore-page-btn--nav"
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

// ── Individual Course Card ───────────────────────────────────
function ExploreCourseCard({ course }) {
  const priceNum = parseInt(String(course.price).replace(/[^0-9]/g, ""), 10) || 0;
  const oldPriceNum = parseInt(String(course.oldPrice || "").replace(/[^0-9]/g, ""), 10);
  const discount = oldPriceNum > priceNum
    ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100)
    : 0;

  return (
    <Link to={`/course/${course._id}`} className="exp-card">

      {/* Thumbnail */}
      <div className="exp-card-thumb">
        <img
          src={course.image}
          alt={course.title}
          className="exp-card-img"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&h=220&fit=crop";
          }}
        />
        {/* Overlay on hover */}
        <div className="exp-card-overlay">
          <span className="exp-card-preview">
            <BookOpen size={16} /> Preview Course
          </span>
        </div>
        {/* Category badge */}
        <span className="exp-card-category">{course.category}</span>
        {/* Discount badge */}
        {discount > 0 && (
          <span className="exp-card-discount">{discount}% OFF</span>
        )}
      </div>

      {/* Body */}
      <div className="exp-card-body">
        <h3 className="exp-card-title">{course.title}</h3>
        <p className="exp-card-author">by {course.author}</p>

        {/* Meta row */}
        <div className="exp-card-meta">
          <span className="exp-card-rating">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            {course.rating?.replace?.("⭐", "") || "4.8"}
          </span>
          <span className="exp-card-dot">·</span>
          <span className="exp-card-hours">
            <Clock size={13} />
            {course.totalHours || 24}h
          </span>
          <span className="exp-card-dot">·</span>
          <span className="exp-card-students">
            <Users size={13} />
            1.2K
          </span>
        </div>

        {/* Price row */}
        <div className="exp-card-footer">
          <div className="exp-card-prices">
            <span className="exp-card-price">₹{priceNum}</span>
            {oldPriceNum > priceNum && (
              <span className="exp-card-old-price">₹{oldPriceNum}</span>
            )}
          </div>
          <span className="exp-card-enroll-btn">Enroll →</span>
        </div>
      </div>
    </Link>
  );
}
