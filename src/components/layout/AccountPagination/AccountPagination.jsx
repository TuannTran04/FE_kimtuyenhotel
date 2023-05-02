import React from "react";
import "./AccountPagination.css";

const AccountPagination = ({ paginationData }) => {
  const { currentPage, totalPages, setCurrentPage } = paginationData;
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
    <>
      <div className="account_pagination">
        <button
          className="account_pagination-item account_prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        {renderPagination()}
        <button
          className="account_pagination-item account_next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    </>
  );
};

export default AccountPagination;
