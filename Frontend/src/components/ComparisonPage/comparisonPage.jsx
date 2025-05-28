import React from 'react';
import './comparisonPage.scss';
import { useLocation } from 'react-router-dom';
import { useComparison } from '../../context/ComparisonContext';

const ComparisonPage32 = () => {
  const location = useLocation();
  const { comparisonList , setComparisonList } = useComparison();
  const compareList = location.state?.compareList || comparisonList;

  function getSingleImageURI(imagePaths) {
    if (!imagePaths || imagePaths.length === 0) return "";
    return `http://localhost:8800/images/${imagePaths[0]}`;
  }
 
  const handleRemoveProperty = (propertyId) => {
    const updatedList = compareList.filter((property) => property.id !== propertyId);
    setComparisonList(updatedList); // Update the comparison list in the context
  };
  return (
    <div className="comparisonPage">
      <div className="comparisonHeader32">
        <h1>Property Comparison</h1>
        <p className="comparisonSubtitle32">Compare features and make an informed decision</p>
      </div>
      
      {compareList && compareList.length > 0 ? (
        <div className="comparisonContainer32">
          {/* Property Images and Titles */}
          <div className="comparisonRow32 headerRow32">
            <div className="fieldLabel32">Properties</div>
            {compareList.map((property) => (
              <div className="propertyColumn32" key={property.id}>
                <div className="propertyCard32">
                  <div className="imageWrapper32">
                    <img
                      src={getSingleImageURI(property.photos)}
                      alt={property.title}
                      className="propertyImage32"
                    />
                  </div>
                  <h3 className="propertyTitle32">{property.title}</h3>
                  <button
                    className="removeButton32"
                    onClick={() => handleRemoveProperty(property.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Price Row */}
          <div className="comparisonRow32">
            <div className="fieldLabel32">Price</div>
            {compareList.map((property) => (
              <div className="propertyValue32 priceValue32" key={property.id}>
                <span className="currencySymbol32">₹</span>
                {property.Price}
              </div>
            ))}
          </div>
          <div className="comparisonRow32">
            <div className="fieldLabel32">Furnished Status</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property.FurnishedStatus} 
              </div>
            ))}
            </div>
          {/* Size Row */}
          <div className="comparisonRow32">
            <div className="fieldLabel32">Size</div>
            {compareList.map((property) => (
              <div className="propertyValue32" key={property.id}>
                {property.Area} <span className="unitText32">sq.ft</span>
              </div>
            ))}
          </div>
          
          {/* Bedrooms Row */}
          <div className="comparisonRow32">
            <div className="fieldLabel32">Bedrooms</div>
            {compareList.map((property) => (
              <div className="propertyValue32" key={property.id}>
                {property.Bedrooms}
              </div>
            ))}
          </div>
          
          {/* Bathrooms Row */}
          <div className="comparisonRow32">
            <div className="fieldLabel32">Bathrooms</div>
            {compareList.map((property) => (
              <div className="propertyValue32" key={property.id}>
                {property.Bathrooms}
              </div>
            ))}
          </div>
          
          {/* Location Row */}
          <div className="comparisonRow32">
            <div className="fieldLabel32">Location</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property.Location}
              </div>
            ))}
          </div>
          <div className="comparisonRow32">
            <div className="fieldLabel32">Negotiable</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property.Negotiable ? "Yes" : "No"}
              </div>
            ))}
          </div>
          {/* Amenities Row */}
          <div className="comparisonRow32">
            <div className="fieldLabel32">Garden</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property.Garden ? "Yes" : "No"}
              </div>
            ))}
          </div>
          <div className="comparisonRow32">
            <div className="fieldLabel32">Water</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property.Water ? "Yes" : "No"}
              </div>
            ))}
          </div>
          <div className="comparisonRow32">
            <div className="fieldLabel32">Parking</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property.Parking ? "Yes" : "No"}
              </div>
            ))}
          </div>
          <div className="comparisonRow32">
            <div className="fieldLabel32">Pool</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property.Pool ? "Yes" : "No"}
              </div>
            ))}
          </div>
          <div className="comparisonRow32">
            <div className="fieldLabel32">School</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property.schoolDistance} {property.schoolDistanceUnit }
              </div>
            ))}
          </div>
          <div className="comparisonRow32">
            <div className="fieldLabel32">Hospital</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property.hospitalDistance} {property.hospitalDistanceUnit }
              </div>
            ))}
          </div>
          <div className="comparisonRow32">
            <div className="fieldLabel32">Railway</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property.railwayDistance} {property.railwayDistanceUnit }
              </div>
            ))}
          </div>
          <div className="comparisonRow32">
            <div className="fieldLabel32">Bus Stand</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property. busStandDistance} {property. busStandDistanceUnit }
              </div>
            ))}
          </div>
          <div className="comparisonRow32">
            <div className="fieldLabel32">Restaurant</div>
            {compareList.map((property) => (
              <div className="propertyValue32 locationValue32" key={property.id}>
                {property.restaurantDistance} {property.restaurantDistanceUnit }
              </div>
            ))}
            </div>
        </div>
      ) : (
        <div className="emptyState32">
          <p>No properties selected for comparison.</p>
          <button className="browseButton32">Browse Properties</button>
        </div>
      )}
    </div>
  );
};

export default ComparisonPage32;