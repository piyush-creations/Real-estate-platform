import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PropertyCard = ({ id, image, title, location, price, beds, baths, area }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleBookNow = () => {
    navigate(`/property/${id}`); // Navigate to the PropertyPage with property ID
  };

  return (
    <div className="property-card">
      <img src={image} alt={title} className="property-image" />
      <div className="property-details">
        <h3>{title}</h3>
        <p>{location}</p>
        <div className="property-info">
          <span>{beds} Bed</span>
          <span>{baths} Bath</span>
          <span>{area} m²</span>
        </div>
        <div className="property-price">
          <button className="book-now" onClick={handleBookNow}>Book Now</button>
          <span>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
