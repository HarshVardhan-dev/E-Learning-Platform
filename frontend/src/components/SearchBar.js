import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search courses..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
