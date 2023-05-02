import React from "react";
import "./ProductPag.css";

const ProductPag = ({ paginationData }) => {
  const { currentPage, totalPages, setCurrentPage } = paginationData;
  //   console.log(paginationData);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`product_pagination-item product_pages ${
            i === currentPage ? "active" : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="product_pagination">
      <button
        className="product_pagination-item product_prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Trước
      </button>
      {renderPagination()}
      <button
        className="product_pagination-item product_next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Sau
      </button>
    </div>
  );
};

export default ProductPag;
