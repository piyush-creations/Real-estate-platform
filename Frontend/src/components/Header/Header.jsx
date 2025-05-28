// src/components/RealEstateHeader.jsx
import React, { useState, useEffect } from 'react';
import './Header.css'; // Make sure to import the CSS file
import { useNavigate } from "react-router-dom";

const RealEstateHeader = () => {
  const [activeTab, setActiveTab] = useState("House");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedPropertyFor, setSelectedPropertyFor] = useState("Any");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    // Add the new search to recent searches (avoiding duplicates)
    const newSearches = [
      searchQuery,
      ...recentSearches.filter(search => search !== searchQuery)
    ].slice(0, 5);

    setRecentSearches(newSearches);
    localStorage.setItem('recentPropertySearches', JSON.stringify(newSearches));

    try {
      const response = await fetch(
        `http://localhost:8800/api/property/search?Location=${encodeURIComponent(searchQuery)}&propertyFor=${encodeURIComponent(selectedPropertyFor)}&propertyType=${encodeURIComponent(activeTab)}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.properties && data.properties.length > 0) {
        navigate('/property-list', { state: { properties: data.properties } });
      } else {
        // Handle no results scenario
        alert("No properties found matching your criteria. Try a different search.");
      }
    } catch (error) {
      console.error("Error during property search:", error);
      alert("There was an error with your search. Please try again later.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    // Optional: automatically trigger search when clicking a recent search
  };

  return (
    <div className="realEstateHeader">
      <div className="reHeaderContainer">
        <div className="reHeaderTop">
          <h1 className="reHeaderTitle">Your Space, Your Choice</h1>
          <p className="reHeaderDescription">
            Find the perfect home that aligns with your lifestyle, needs, and aspirations.
            Professional assistance every step of the way.
          </p>
          {/* <button className="reStartButton">Get Started</button> */}
        </div>

        <nav className="reNavigation">
          <ul className="reNavList">
            {["House", "Flat", "PG / Co-living"].map((tab) => (
              <li
                key={tab}
                className={activeTab === tab ? "reNavItem reNavItemActive" : "reNavItem"}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </nav>

        <div className="reSearchArea">
          <div className="reSearchBar">
            <select
              className="rePropertyType"
              value={selectedPropertyFor}
              onChange={(e) => setSelectedPropertyFor(e.target.value)}
              aria-label="Property purpose"
            >
              <option value="Any">Property For</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
            </select>

            <input
              type="text"
              placeholder="Search location (e.g., Prayagraj, Mumbai)"
              className="reSearchInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              aria-label="Search location"
            />

            <button
              className="reSearchButton"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {recentSearches.length > 0 && (
            <div className="reRecentSearches">
              <span className="reRecentLabel">Recent:</span>
              {recentSearches.map((search, index) => (
                <span
                  key={index}
                  className="reRecentItem"
                  onClick={() => handleRecentSearchClick(search)}
                >
                  {search}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealEstateHeader;