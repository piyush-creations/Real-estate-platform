import React, { useEffect } from 'react';
import './PropertySuggestions.css'; // Assuming a CSS file for styling
import axios from 'axios';
import { useState} from 'react';
import { FaBed, FaBath, FaMapMarkerAlt,FaArrowsAlt } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom'; // Import Link for navigation


const PropertySuggestions = () => {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/recommendations/properties",
        );
        if (!ignore && response.status === 200) {
          // Debugging log
          setFeatured(response.data);
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
    if (photos.length >= 1) {
      return getImageURI(photos[0]);
    }
    return "/assets/images/Personal.jpeg";
  }
  return (
    <div className="property-suggestions">
      <h2>Suggested</h2>
      <div className="suggestions-list" >
        {featured.map((property) => (
          <div className="propertyS suggestion-item" key={property.id}>
            <img src={getMainImage(property.photos)} alt={property.title} />
            <div className="detailS">
               <FaMapMarkerAlt /> {property.Location}
               </div>
               <p ><b>{property.propertyFor}</b></p>
         <div className="propertyS-details">
               
               <FaBed /> {property.Bedrooms} Bed 
            
               <FaBath />  {property.Bathrooms} Bath

             <FaArrowsAlt /> {property.Area} sqft
             
             
            </div>
            <p className="price">Price: ₹ {property.Price}</p>
           
            
         <Link to={`/singlepage/${property.id}`}>
           <button>View Details</button>
         </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySuggestions;