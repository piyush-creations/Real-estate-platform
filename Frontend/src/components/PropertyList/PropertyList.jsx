import React, { useEffect, useState } from 'react';
import './PropertyList.css';
import Filter from '../Filter/Filter';
import Footer from '../Footer/Footer';
import { Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { FaBed, FaBath, FaMapMarkerAlt, FaRulerCombined, FaHeart, FaStar } from 'react-icons/fa';
import { BiChevronRight } from 'react-icons/bi';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const location= useLocation();

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setLoading(true);

      if (location.state?.properties) {
        console.log("📥 Received properties from search:", location.state.properties);
        setProperties(location.state.properties);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8800/api/featured/properties");
        if (!ignore && response.status === 200) {
          setProperties(response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const savedFavorites = localStorage.getItem('favoriteProperties');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    return () => { ignore = true };
  }, [location.state]);

  useEffect(() => {
    console.log("📦 Properties updated:", properties);
  }, [properties]);

  // Log properties every time they are updated
  useEffect(() => {
    console.log("Properties after fetch:", properties);
  }, [properties]); // This will log every time `properties` state is updated
    

  function getImageURI(imagePath) {
    return `http://localhost:8800/images/${imagePath}`;
  }

  const toggleFavorite = (propertyId) => {
    let newFavorites;
    if (favorites.includes(propertyId)) {
      newFavorites = favorites.filter(id => id !== propertyId);
    } else {
      newFavorites = [...favorites, propertyId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favoriteProperties', JSON.stringify(newFavorites));
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Finding the perfect properties for you...</p>
      </div>
    );
  }

  return (
    <div className="property-list-page">
      <div className="property-hero">
        <div className="hero-content">
          <h1>Find Your Dream Property</h1>
          <p className="hero-subtitle">Discover the perfect place to call home from our exclusive listings</p>
        </div>
      </div>
      
      <div className="property-list-container">
        {/* <div className="filter-section">
          <Filter />
        </div> */}
        
        <div className="properties-header">
          <h2>Featured Properties</h2>
          <div className="properties-count">{properties.length} properties available</div>
        </div>
        
        <div className="property-grid">
          {properties.map((property) => (
            <div className="property-card" key={property.id}>
              <div className="property-image-container">
                <div className={`property-badge ${property.propertyFor.toLowerCase()}`}>
                  {property.propertyFor}
                </div>
                <Slider {...sliderSettings} className="property-slider">
                  {property.photos && property.photos.map((img, index) => (
                    <div key={index} className="slider-image-container">
                      <img
                        src={getImageURI(img)}
                        alt={`Property ${property.id} view ${index + 1}`}
                        className="property-image"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              
              <div className="property-content">
                <div className="property-price">₹{property.Price.toLocaleString('en-IN')}</div>
                
                <h3 className="property-title">{property.Location}</h3>
                
                <div className="property-address">
                  <FaMapMarkerAlt />
                  <span>{property.Location}</span>
                </div>
                
                <div className="property-features">
                  <div className="feature">
                    <FaBed />
                    <span>{property.Bedrooms} {property.Bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                  </div>
                  
                  <div className="feature">
                    <FaBath />
                    <span>{property.Bathrooms} {property.Bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                  </div>
                  
                  <div className="feature">
                    <FaRulerCombined />
                    <span>{property.Area} sqft</span>
                  </div>
                </div>
                
                {property.FurnishedStatus && (
                  <div className="property-tag">{property.FurnishedStatus}</div>
                )}
                
                <Link to={`/singlepage/${property.id}`} className="view-details-button">
                  <span>View Details</span>
                  <BiChevronRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {properties.length === 0 && !loading && (
          <div className="no-properties">
            <img src="/no-results.svg" alt="No properties found" />
            <h3>No properties found</h3>
            <p>Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
      
      <div className="property-cta-section">
        <div className="cta-content">
          <FaStar className="cta-icon" />
          <h2>Can't find what you're looking for?</h2>
          <p>Our premium properties are exclusively picked for you</p>
          <Link to="/contact" className="cta-button">Contact Us</Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyList;