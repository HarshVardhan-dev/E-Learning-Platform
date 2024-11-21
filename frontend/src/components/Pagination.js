import React from "react";

const Pagination = ({ totalPages, handlePageChange, page }) => {
  return (
    <div className="flex justify-center mt-4">
      {[...Array(totalPages).keys()].map((num) => (
        <button
          key={num}
          className={`px-4 py-2 mx-1 ${
            num + 1 === page ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handlePageChange(num + 1)}
        >
          {num + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
