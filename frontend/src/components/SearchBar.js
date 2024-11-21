import React from "react";

const SearchBar = ({ onSearch, searchTerm }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="p-4">
      <input
        value={searchTerm}
        type="text"
        placeholder="Search courses..."
        onChange={handleInputChange}
        className="w-full p-2 border rounded shadow"
      />
    </div>
  );
};

export default SearchBar;
