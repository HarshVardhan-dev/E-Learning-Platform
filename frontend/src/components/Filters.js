import React from "react";

const Filters = ({ filters, sortOption, onFilterChange, onSortChange }) => {
  const handleCategoryChange = (e) => {
    onFilterChange("category", e.target.value);
  };

  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split("-");
    onFilterChange("minPrice", min ? Number(min) : 0);
    onFilterChange("maxPrice", max ? Number(max) : Infinity);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const clearFilters = () => {
    onFilterChange("category", "");
    onFilterChange("minPrice", 0);
    onFilterChange("maxPrice", Infinity);
    onSortChange("createdAt-asc"); // Reset sorting to default
  };

  return (
    <div className="p-4 border-b">
      <h3 className="font-bold mb-2">Filters</h3>

      {/* Category Filter */}
      <label className="block font-medium mb-1" htmlFor="categoryFilter">
        Category
      </label>
      <select
        id="categoryFilter"
        value={filters.category || ""}
        onChange={handleCategoryChange}
        className="mb-4 p-2 border rounded w-full"
      >
        <option value="">All Categories</option>
        <option value="Programming">Programming</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
      </select>

      {/* Price Filter */}
      <label className="block font-medium mb-1" htmlFor="priceFilter">
        Price Range
      </label>
      <select
        id="priceFilter"
        value={
          filters.minPrice === 0 && filters.maxPrice === Infinity
            ? ""
            : `${filters.minPrice || 0}-${
                filters.maxPrice === Infinity ? "" : filters.maxPrice
              }`
        }
        onChange={handlePriceChange}
        className="mb-4 p-2 border rounded w-full"
      >
        <option value="">All Prices</option>
        <option value="0-50">Under $50</option>
        <option value="50-100">$50 - $100</option>
        <option value="100-">Above $100</option>
      </select>

      {/* Sorting Options */}
      <label className="block font-medium mb-1" htmlFor="sortFilter">
        Sort By
      </label>
      <select
        id="sortFilter"
        value={sortOption}
        onChange={handleSortChange}
        className="mb-4 p-2 border rounded w-full"
      >
        <option value="createdAt-asc">Newest First</option>
        <option value="createdAt-desc">Oldest First</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="ratings-desc">Ratings: High to Low</option>
        <option value="ratings-asc">Ratings: Low to High</option>
      </select>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="mt-4 p-2 bg-gray-200 hover:bg-gray-300 border rounded w-full text-center"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
