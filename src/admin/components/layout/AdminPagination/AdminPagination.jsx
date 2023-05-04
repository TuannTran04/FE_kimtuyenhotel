import React from "react";
import "./AdminPagination.css";

// const AdminPagination = ({ paginationData }) => {
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
//           className={`product_pagination-item product_pages ${
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
//       <div className="adminRoom_pagination">
//         <button
//           className="adminRoom_pagination-item adminRoom_prev"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Trước
//         </button>
//         {renderPagination()}
//         <button
//           className="adminRoom_pagination-item adminRoom_next"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Sau
//         </button>
//       </div>
//     </>
//   );
// };

// export default AdminPagination;

const AdminPagination = ({ paginationData, visiblePage = 4 }) => {
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
          className={`adminRoom_pagination-item adminRoom_pages ${
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
          className="adminRoom_pagination-item adminRoom_pages"
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
          className="adminRoom_pagination-item adminRoom_pages"
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
      <div className="adminRoom_pagination">
        <button
          className="adminRoom_pagination-item adminRoom_prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        {renderPagination()}
        <button
          className="adminRoom_pagination-item adminRoom_next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    </>
  );
};

export default AdminPagination;
