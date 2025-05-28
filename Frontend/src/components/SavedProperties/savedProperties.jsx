import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './savedProperties.scss';
import Footer from '../Footer/Footer';

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const navigate = useNavigate();

  function getImageURI(imagePath) {
    return `http://localhost:8800/images/${imagePath}`;
  }

  useEffect(() => {
    // Fetch saved properties from backend on component mount
    fetchSavedProperties();
  }, []);

  const fetchSavedProperties = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/property/saved', {
        method: 'GET',
        credentials: 'include', // Important for sending cookies
      });
      if (!response.ok) {
        throw new Error('Failed to fetch saved properties');
      }
      const properties = await response.json();
      setSavedProperties(properties);
    } catch (error) {
      console.error('Error fetching saved properties:', error);
    }
  };

  const handleRemove = async (propertyId) => {
    try {
      const response = await fetch(`http://localhost:8800/api/property/saved/${propertyId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to unsave property');
      }
      const updatedProperties = savedProperties.filter(property => property.id !== propertyId);
      setSavedProperties(updatedProperties);
    } catch (error) {
      console.error('Error unsaving property:', error);
    }
  };

  return (
    <div className="page-wrapper22">
      <div className="SavedProperties22">
        <div className="leftt22">
          <div className="sidebar-content22">
            <div className="sidebar-icon22">💎</div>
            <h1 className="heading22">Saved Properties</h1>
            <div className="property-count22">{savedProperties.length} properties</div>
            <div className="sidebar-divider22"></div>
            <p className="sidebar-text22">Your curated collection of dream properties ready to explore.</p>
          </div>
        </div>
        
        {savedProperties.length > 0 ? (
          <div className="rightt22">
            <div className="property-list22">
              {savedProperties.map(property => (
                <div className="property-card22" key={property.id}>
                  <div className="card-badge22">Saved</div>
                  <div className="image-container22">
                    <img
                      className="property-image22"
                      src={property.photos?.[0] ? getImageURI(property.photos[0]) : "/fallback-image.jpg"}
                      alt={property.title}
                    />
                    <div className="image-overlay22">
                      <button 
                        className="quick-view-btn22" 
                        onClick={() => navigate(`/singlepage/${property.id}`)}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                  <div className="property-info22">
                    <h2 className="property-title22">{property.title}</h2>
                    <div className="property-meta22">
                      <div className="price-tag22">₹ {property.Price}</div>
                      <div className="location-tag22">{property.Location}</div>
                    </div>
                    <div className="property-actions22">
                      <button 
                        className="view-btn22" 
                        onClick={() => navigate(`/singlepage/${property.id}`)}
                      >
                        View Details
                      </button>
                      <button 
                        className="remove-btn22" 
                        onClick={() => handleRemove(property.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state22">
            <div className="empty-illustration22">🏠</div>
            <h3 className="empty-title22">No Saved Properties Yet</h3>
            <p className="empty-desc22">Start exploring and saving properties you love!</p>
            <button className="browse-btn22" onClick={() => navigate('/')}>
              Browse Properties
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SavedProperties;