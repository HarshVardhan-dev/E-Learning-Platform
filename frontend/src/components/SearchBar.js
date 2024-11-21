import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search courses..."
        onChange={handleInputChange}
        className="w-full p-2 border rounded shadow"
      />
    </div>
  );
};

export default SearchBar;
