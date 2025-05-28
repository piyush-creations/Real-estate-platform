import React from 'react';
import { useParams } from 'react-router-dom'; // To fetch the parameter from URL
import { properties } from '../../data/dummyData'; // Import the dummy data
import './PropertyPage.css'; // Assuming you want a separate CSS file for styling

const PropertyPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const property = properties.find((item) => item.id === parseInt(id)); // Find the property using the ID

  if (!property) {
    return <h2>Property not found</h2>;
  }

  return (
    <div className="property-page">
      {/* Property Title and Details */}
      <div className="property-header">
        <h1>{property.title}</h1>
        <p>{property.details}</p>
        <h2 className="price">{property.price}</h2>
      </div>

      {/* Image Gallery */}
      <div className="image-gallery">
        <img src={property.img} alt={property.title} className="main-image" />
        <div className="thumbnail-container">
          {/* Optionally, you can add thumbnail images here */}
        </div>
      </div>

      {/* Full Description */}
      <div className="property-description">
        <h3>Property Description</h3>
        <p>{property.description}</p>
      </div>

      {/* Features and Amenities */}
      <div className="property-features">
        <h3>Features and Amenities</h3>
        <ul>
          {/* List features if available */}
        </ul>
      </div>

      {/* Agent Contact Information */}
      <div className="agent-info">
        <h3>Contact Agent</h3>
        <p>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
        <p>Phone: +234 700 123 4567</p>
      </div>

      {/* Inquiry Form */}
      <div className="inquiry-form">
        <h3>Schedule a Viewing</h3>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="tel" placeholder="Your Phone" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Related Properties */}
      <div className="related-properties">
        <h3>Similar Properties</h3>
        <div className="property-cards">
          {/* Show similar properties if needed */}
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
