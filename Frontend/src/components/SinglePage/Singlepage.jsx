import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "../slider/Slider";
import PropertySuggestions from "../PropertySuggestions/PropertySuggestions";
import { userData } from "../../lib/dummyData";
import "./singlepage.scss";
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaRegHeart, FaHeart, FaSchool, FaTrain, FaBus, FaUtensils, FaHospitalAlt, FaCheck, FaTimes, FaRegClock, FaCoins, FaShieldAlt, FaTools } from "react-icons/fa";
import { MdLocationOn, MdCompare } from "react-icons/md";

const Singlepage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  
  const user = userData[0];

  // Initialize comparisonList from localStorage if exists
  const [comparisonList, setComparisonList] = useState(() => {
    const savedList = localStorage.getItem("comparisonList");
    return savedList ? JSON.parse(savedList) : [];
  });

  function getImageURI(imagePath) {
    return `http://localhost:8800/images/${imagePath}`;
  }

  useEffect(() => {
    let ignore = false;
    const fetchData = async (id) => {
      setLoading(true);
      try {
        const response = await axios(`http://localhost:8800/api/property/${id}`);
        if (!ignore && response.status === 200) {
          setPropertyData(response.data);
          
          // Check if property is already saved by this user
          const isLoggedIn = localStorage.getItem("isLoggedIn");
          if (isLoggedIn) {
            try {
              const savedResponse = await axios.get(
                `http://localhost:8800/api/property/check-saved/${response.data.id}`,
                { withCredentials: true }
              );
              setSaved(savedResponse.data.saved);
            } catch (error) {
              console.error("Error checking saved status:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData(id);
    return () => {
      ignore = true;
    };
  }, [id, navigate]);

  const handleCompare = () => {
    if (!propertyData) return;
    
    let newComparisonList;
    // Check if the property is already in the comparison list
    if (!comparisonList.some((item) => item.id === propertyData.id)) {
      // If not, add the property to the comparison list
      newComparisonList = [...comparisonList, propertyData];
    } else {
      // If already in the list, remove the property
      newComparisonList = comparisonList.filter(
        (item) => item.id !== propertyData.id
      );
    }
    setComparisonList(newComparisonList);
    // Update localStorage
    localStorage.setItem("comparisonList", JSON.stringify(newComparisonList));
  };

  const handleGoToComparison = () => {
    if (comparisonList.length > 1) {
      navigate("/comparison", { state: { compareList: comparisonList } });
    } else {
      alert("Please select at least two properties to compare.");
    }
  };

  const handleSave = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
  
    if (!isLoggedIn) {
      navigate("/signin", { state: { redirectTo: `/singlepage/${id}` } });
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:8800/api/property/save/${propertyData.id}`,
        {}, // no need to send body
        { withCredentials: true }
      );
  
      if (response.status === 201) {
        setSaved(true);
        alert("Property saved successfully!");
      } else {
        alert("Failed to save the property. Please try again.");
      }
    } catch (error) {
      console.error("Error saving property:", error);
      alert("An error occurred while saving the property.");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  if (!propertyData) {
    return null;
  }

  const isInComparisonList = comparisonList.some(item => item.id === propertyData.id);

  return (
    <div className="property-page">
      <div className="property-container">
        {/* Left Column - Property Images and Details */}
        <div className="property-main">
          <div className="image-gallery">
            <Slider
              images={
                propertyData.photos &&
                propertyData.photos.map((path) => getImageURI(path))
              }
            />
            
            <div className="property-status">
              <span className={`status-badge ${propertyData.propertyFor.toLowerCase()}`}>{propertyData.propertyFor}</span>
            </div>
          </div>

          <div className="property-header">
            <div className="property-title">
              <h1>{propertyData.Location}</h1>
              <div className="location">
                <MdLocationOn />
                <span>{propertyData.Location}</span>
              </div>
            </div>
            <div className="property-price">
              <span className="price-amount">₹ {propertyData.Price}</span>
              {propertyData.Negotiable && <span className="negotiable-tag">Negotiable</span>}
            </div>
          </div>

          <div className="property-stats">
            <div className="stat-item">
              <FaRulerCombined />
              <span>{propertyData.Area} sqft</span>
            </div>
            <div className="stat-item">
              <FaBed />
              <span>{propertyData.Bedrooms} {propertyData.Bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
            </div>
            <div className="stat-item">
              <FaBath />
              <span>{propertyData.Bathrooms} {propertyData.Bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
            </div>
          </div>

          <div className="property-description">
            <h2>About this property</h2>
            <p>{propertyData.description}</p>
          </div>

          <div className="property-features1">
            <h2>Features & Amenities</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">{propertyData.Negotiable ? <FaCheck className="available" /> : <FaTimes className="unavailable" />}</div>
                <div className="feature-text">Negotiable</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">{propertyData.Garden ? <FaCheck className="available" /> : <FaTimes className="unavailable" />}</div>
                <div className="feature-text">Garden</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">{propertyData.Parking ? <FaCheck className="available" /> : <FaTimes className="unavailable" />}</div>
                <div className="feature-text">Parking</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><FaCheck className="available" /></div>
                <div className="feature-text">Furnished: {propertyData.FurnishedStatus}</div>
              </div>
              {propertyData.propertyFor !== "Sale" && (
                <>
                  <div className="feature-item">
                    <div className="feature-icon"><FaShieldAlt /></div>
                    <div className="feature-text">Security: ₹{propertyData.SecurityDeposit}</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon"><FaTools /></div>
                    <div className="feature-text">Maintenance: ₹{propertyData.MaintenanceCharges}</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon"><FaRegClock /></div>
                    <div className="feature-text">Lease: {propertyData.LeaseDuration}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="property-sidebar">
          <div className="agent-card">
            <div className="agent-info">
              <img src={user.profilePicture} alt={user.username} className="agent-avatar" />
              <div className="agent-details">
                <h3>{user.username}</h3>
                <p>Property Agent</p>
              </div>
            </div>
            <Link to="/contact" className="contact-button">Contact Agent</Link>
          </div>

          <div className="action-buttons">
            <button 
              onClick={handleSave} 
              className={`action-button save-button ${saved ? 'saved' : ''}`}
            >
              {saved ? <FaHeart /> : <FaRegHeart />}
              <span>{saved ? "Saved" : "Save Property"}</span>
            </button>
            
            <button 
              onClick={handleCompare} 
              className={`action-button compare-button ${isInComparisonList ? 'active' : ''}`}
            >
              <MdCompare />
              <span>{isInComparisonList ? "Remove from Compare" : "Add to Compare"}</span>
            </button>
            
            {comparisonList.length > 1 && (
              <button onClick={handleGoToComparison} className="action-button goto-compare-button">
                Go to Comparison ({comparisonList.length})
              </button>
            )}
          </div>

          <div className="nearby-places">
            <h3>Nearby Places</h3>
            <div className="place-item">
              <div className="place-icon">
                <FaSchool />
              </div>
              <div className="place-details">
                <h4>School</h4>
                <p>{propertyData.schoolDistance} {propertyData.schoolDistanceUnit} away</p>
              </div>
            </div>
            <div className="place-item">
              <div className="place-icon">
                <FaTrain />
              </div>
              <div className="place-details">
                <h4>Railway</h4>
                <p>{propertyData.railwayDistance} {propertyData.railwayDistanceUnit} away</p>
              </div>
            </div>
            <div className="place-item">
              <div className="place-icon">
                <FaBus />
              </div>
              <div className="place-details">
                <h4>Bus Stop</h4>
                <p>{propertyData.busStandDistance} {propertyData.busStandDistanceUnit} away</p>
              </div>
            </div>
            <div className="place-item">
              <div className="place-icon">
                <FaUtensils />
              </div>
              <div className="place-details">
                <h4>Restaurant</h4>
                <p>{propertyData.restaurantDistance} {propertyData.restaurantDistanceUnit} away</p>
              </div>
            </div>
            <div className="place-item">
              <div className="place-icon">
                <FaHospitalAlt />
              </div>
              <div className="place-details">
                <h4>Hospital</h4>
                <p>{propertyData.hospitalDistance} {propertyData.hospitalDistanceUnit} away</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Recommendations */}
      {localStorage.getItem("isLoggedIn") && (
        <div className="similar-properties">
          <h2>Similar Properties You Might Like</h2>
          <PropertySuggestions />
        </div>
      )}
    </div>
  );
};

export default Singlepage;