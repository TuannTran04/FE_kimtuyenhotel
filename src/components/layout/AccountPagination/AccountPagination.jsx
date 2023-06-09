import React from "react";
import "./AccountPagination.css";

// const AccountPagination = ({ paginationData }) => {
//   const { currentPage, totalPages, setCurrentPage } = paginationData;
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const renderPagination = () => {
//     const pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <button
//           key={i}
//           className={`account_pagination-item account_pages ${
//             i === currentPage ? "active" : ""
//           }`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       );
//     }
//     return pages;
//   };

//   return (
//     <>
//       <div className="account_pagination">
//         <button
//           className="account_pagination-item account_prev"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Trước
//         </button>
//         {renderPagination()}
//         <button
//           className="account_pagination-item account_next"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Sau
//         </button>
//       </div>
//     </>
//   );
// };

// export default AccountPagination;

const AccountPagination = ({ paginationData, visiblePage = 4 }) => {
  const { currentPage, totalPages, setCurrentPage } = paginationData;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    let startPage = 1;
    let endPage = totalPages;
    const halfVisiblePage = Math.floor(visiblePage / 2);

    if (totalPages > visiblePage) {
      if (currentPage <= halfVisiblePage) {
        endPage = visiblePage;
      } else if (currentPage > totalPages - halfVisiblePage) {
        startPage = totalPages - visiblePage + 1;
      } else {
        startPage = currentPage - halfVisiblePage;
        endPage = currentPage + halfVisiblePage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`account_pagination-item account_pages ${
            i === currentPage ? "active" : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (totalPages > visiblePage && currentPage > halfVisiblePage + 1) {
      pages.unshift(
        <button
          key="startEllipsis"
          className="account_pagination-item account_pages"
          onClick={() => handlePageChange(1)}
        >
          ...
        </button>
      );
    }

    if (
      totalPages > visiblePage &&
      currentPage < totalPages - halfVisiblePage
    ) {
      pages.push(
        <button
          key="endEllipsis"
          className="account_pagination-item account_pages"
          onClick={() => handlePageChange(totalPages)}
        >
          ...
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
