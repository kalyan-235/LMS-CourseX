import { useState, useEffect } from "react";

import CourseCard from "../components/CourseCard";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

import API from "../api/axios";

export default function Explore() {

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  const categories = [
    "all",
    "frontend",
    "backend",
    "database",
    "fullstack",
  ];

  // FETCH COURSES
  useEffect(() => {
    fetchCourses();
  }, [search, category, sort]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/courses?search=${search}&category=${
          category === "all" ? "" : category
        }&sort=${sort}`
      );
      setCourses(res.data);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
      window.addToast?.("Failed to load courses", "error");
    } finally {
      setLoading(false);
    }
  };

  // FILTER & SORT COURSES
  useEffect(() => {
    setFilteredCourses(courses);
    setCurrentPage(1);
  }, [courses]);

  // PAGINATION
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("");
    setCurrentPage(1);
  };

  return (
    <>
      <div className="explore-header">
        <h1>🎓 Explore Courses</h1>
        <p>Discover a wide range of courses to expand your skills</p>
      </div>

      <div className="explore-container">
        {/* FILTERS SECTION */}
        <div className="filters-section">
          <div className="filter-header">
            <h3>Filters</h3>
            {(search || category !== "all" || sort) && (
              <button className="btn-clear" onClick={handleClearFilters}>
                Clear All
              </button>
            )}
          </div>

          {/* SEARCH */}
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="filter-input"
            />
          </div>

          {/* CATEGORY */}
          <div className="filter-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
              <option value="fullstack">Fullstack</option>
            </select>
          </div>

          {/* SORT */}
          <div className="filter-group">
            <label>Sort By</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="filter-select">
              <option value="">Most Popular</option>
              <option value="latest">Latest</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* COURSES GRID */}
        <div className="courses-section">
          {loading ? (
            <Loading fullPage={false} />
          ) : filteredCourses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>No courses found</h3>
              <p>Try adjusting your filters to find what you're looking for</p>
              <button className="btn-primary" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <CourseCard courses={paginatedCourses} />

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="pagination-container">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
