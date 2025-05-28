import React, { useState } from "react";
import "./Filter.css";

function Filter() {
    const [filters, setFilters] = useState({
        Location: "",
        propertyType: "Any",
        minPrice: "",
        maxPrice: "",
        Bedrooms: "",
    });

    const [properties, setProperties] = useState([]); // Store fetched properties

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        try {
            const queryParams = new URLSearchParams({
                ...(filters.Location && { Location: filters.Location }),
                ...(filters.propertyType !== "Any" && { propertyType: filters.propertyType }),
                ...(filters.minPrice && { minPrice: filters.minPrice }),
                ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
                ...(filters.Bedrooms && { Bedrooms: filters.Bedrooms }),
            });

            const response = await fetch(`http://localhost:8800/api/property/search?${queryParams}`);
            const data = await response.json();

            if (data.success) {
                setProperties(data.properties); // Store results
            } else {
                console.error("Error fetching properties:", data.error);
            }
        } catch (error) {
            console.error("❌ API Call Failed:", error);
        }
    };

    return (
        <div className="Filter">
            <div className="top"></div>
            <div className="bottom">
                <div className="item">
                    <label htmlFor="city">Location</label>
                    <input type="text" id="city" name="city" placeholder="City location" value={filters.Location} onChange={handleChange} />
                </div>

                <div className="item">
                    <label htmlFor="type">Type</label>
                    <select id="type" name="propertyType" value={filters.propertyType} onChange={handleChange}>
                        <option value="Any">Any</option>
                        <option value="Buy">Buy</option>
                        <option value="Rent">Rent</option>
                    </select>
                </div>

                <div className="item">
                    <label htmlFor="propertyType">Property Type</label>
                    <select id="propertyType" name="propertyType" value={filters.propertyType} onChange={handleChange}>
                        <option value="Any">Any</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                    </select>
                </div>

                <div className="item">
                    <label htmlFor="minPrice">Min Price</label>
                    <input type="number" id="minPrice" name="minPrice" placeholder="Any" value={filters.minPrice} onChange={handleChange} />
                </div>

                <div className="item">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input type="number" id="maxPrice" name="maxPrice" placeholder="Any" value={filters.maxPrice} onChange={handleChange} />
                </div>

                <div className="item">
                    <label htmlFor="bedrooms">Bedrooms</label>
                    <input type="number" id="bedrooms" name="bedrooms" placeholder="Any" value={filters.Bedrooms} onChange={handleChange} />
                </div>

                <div className="item">
                    <button className="search-button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>

            <div className="results">
                <h2>Search Results</h2>
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <div key={property.id} className="property-card">
                            <h3>{property.PropertyType} in {property.Location}</h3>
                            <p>Price: ₹{property.Price}</p>
                            <p>Bedrooms: {property.Bedrooms}</p>
                            <p>Bathrooms: {property.Bathrooms}</p>
                            <p>Area: {property.Area} sqft</p>
                        </div>
                    ))
                ) : (
                    <p>No properties found.</p>
                )}
            </div>
        </div>
    );
}

export default Filter;
