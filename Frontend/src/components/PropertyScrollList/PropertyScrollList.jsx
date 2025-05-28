import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./PropertyScrollList.css";
import { FaBed, FaBath, FaMapMarkerAlt, FaArrowsAlt, FaRupeeSign, FaArrowRight } from "react-icons/fa";
import axios from "axios";

function PropertyScrollList02() {
  const scrollRef = useRef(null);
  const [featured, setFeatured] = useState([]);
  
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/featured/properties",
        );
        if (!ignore && response.status === 200) {
          setFeatured(response.data.slice(0, 10));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  function getImageURI(imagePath) {
    return `http://localhost:8800/images/${imagePath}`;
  }

  function getMainImage(photos) {
    if (photos && photos.length >= 1) {
      return getImageURI(photos[0]);
    }
    return "/assets/images/Personal.jpeg";
  }

  // Smooth auto-scrolling effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollBy({
          left: 1,
          behavior: "smooth",
        });
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  // Format price with commas for Indian number format
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="property-scroll-list02">
      <div className="property-list02">
        <h2>Our Popular Homes</h2>
        
        <div className="view-all-container02">
          <Link to="/property-list">
            <button className="view-all-button02">
              View All <FaArrowRight style={{ marginLeft: '8px' }} />
            </button>
          </Link>
        </div>
        
        <div className="scroll-container02" ref={scrollRef}>
          {featured.map((property) => (
            <div className="property-card02" key={property.id}>
              <div className={`ribbon02 ${property.propertyFor?.toLowerCase() === 'rent' ? 'rent' : 'sale'}`}>
                FOR {property.propertyFor ? property.propertyFor.toUpperCase() : "SALE"}
              </div>
              
              <div className="image-container02">
                <img
                  src={getMainImage(property.photos)}
                  alt={property.alt || "Property image"}
                />
              </div>
              
              <div className="location02">
                <FaMapMarkerAlt /> 
                <span>{property.Location}</span>
              </div>
              
              <div className="property-details02">
                <div className="property-feature02">
                  <FaBed /> <span>{property.Bedrooms} Beds</span>
                </div>
                <div className="property-feature02">
                  <FaBath /> <span>{property.Bathrooms} Baths</span>
                </div>
                <div className="property-feature02">
                  <FaArrowsAlt /> <span>{property.Area} sqft</span>
                </div>
              </div>
              
              <div className="price02">
                <span>₹{formatPrice(property.Price)}</span>
              </div>
              
              <Link to={`/singlepage/${property.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyScrollList02;