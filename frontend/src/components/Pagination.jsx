export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const pages = [];
  const maxPagesToShow = 5;

  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxPagesToShow / 2)
  );
  let endPage = Math.min(
    totalPages,
    startPage + maxPagesToShow - 1
  );

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(
      1,
      endPage - maxPagesToShow + 1
    );
  }

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push("...");
    }
    pages.push(totalPages);
  }

  return (
    <div className="pagination">
      <button
        className="pagination-item"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      {pages.map((page, idx) => (
        <button
          key={idx}
          className={`pagination-item ${
            page === currentPage ? "active" : ""
          }`}
          onClick={() => {
            if (typeof page === "number") {
              onPageChange(page);
            }
          }}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-item"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
}
