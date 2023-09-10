import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [onLoad, setOnLoad] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("title");
  const [borrowingStartDate, setBorrowingStartDate] = useState(null);
  const [borrowingEndDate, setBorrowingEndDate] = useState(null);

  useEffect(() => {
    if (onLoad) {
      setSearchTerm("");
      setOnLoad(false);
    }
    handleSearch();
  }, [selectedFilter, searchTerm]);

  const handleSearch = () => {
    if (
      (selectedFilter === "publicationDate" ||
      selectedFilter === "availabilityDate") && searchTerm
    ) {
      const formattedSearchTerm = searchTerm.toISOString();
      onSearch(formattedSearchTerm, selectedFilter);
    } else if (selectedFilter === "borrowingRange") {
      onSearch(
        {
          startDate: borrowingStartDate
            ? borrowingStartDate.toISOString()
            : "",
          endDate: borrowingEndDate ? borrowingEndDate.toISOString() : "",
        },
        selectedFilter
      );
    } else {
      onSearch(searchTerm, selectedFilter);
    }
  };

  const renderFilterInput = () => {
    if (selectedFilter === "publicationDate") {
      return (
        <DatePicker
          selected={searchTerm instanceof Date ? searchTerm : null}
          onChange={(date) => setSearchTerm(date)}
          placeholderText="Search by Publication Date"
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()}
        />
      );
    } else if (selectedFilter === "availabilityDate") {
      return (
        <DatePicker
          selected={searchTerm instanceof Date ? searchTerm : null}
          onChange={(date) => setSearchTerm(date)}
          placeholderText="Search by Availability Date"
          dateFormat="yyyy-MM-dd"
        />
      );
    } else if (selectedFilter === "borrowingRange") {
      return (
        <div className="search-bar-borrowing-range">
          <label>From</label>
          <DatePicker
            selected={borrowingStartDate}
            onChange={(date) => setBorrowingStartDate(date)}
            placeholderText="Start Date"
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
          />
          <label>To</label>
          <DatePicker
            selected={borrowingEndDate}
            onChange={(date) => setBorrowingEndDate(date)}
            placeholderText="End Date"
            dateFormat="yyyy-MM-dd"
          />
        </div>
      );
    } else {
      return (
        <input
          type="text"
          placeholder={`Search by ${selectedFilter}`}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      );
    }
  };

  return (
    <div className="search-bar">
      {renderFilterInput()}

      <select
        className="select-options"
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publicationDate">Publication Date</option>
        <option value="availabilityDate">Availability Date</option>
        <option value="borrowingRange">Borrowing Range</option>
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
