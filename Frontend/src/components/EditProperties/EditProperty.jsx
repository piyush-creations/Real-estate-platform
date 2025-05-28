import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProperty.css';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Property state with all fields from schema
  const [property, setProperty] = useState({
    propertyFor: '',
    propertyType: '',
    Location: '',
    Bedrooms: 0,
    Bathrooms: 0,
    Area: 0,
    Price: 0,
    Negotiable: false,
    MonthlyRent: '',
    FurnishedStatus: '',
    Age: 0,
    SecurityDeposit: 0,
    pFacing: '',
    Floornumber: 0,
    Flatnumber: '',
    MaintenanceCharges: 0,
    LeaseDuration: 0,
    Floors: 0,
    Water: false,
    Garden: false,
    Pool: false,
    Parking: false,
    railwayAvailability: 'No',
    railwayDistance: '',
    railwayDistanceUnit: 'km',
    hospitalAvailability: 'No',
    hospitalDistance: '',
    hospitalDistanceUnit: 'km',
    busStandAvailability: 'No',
    busStandDistance: '',
    busStandDistanceUnit: 'km',
    schoolAvailability: 'No',
    schoolDistance: '',
    schoolDistanceUnit: 'km',
    restaurantlAvailability: 'No',
    restaurantDistance: '',
    restaurantDistanceUnit: 'km',
    Features: {},
    photos: []
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8800/api/property/property/${id}`);
        const propertyData = response.data;

        // Ensure all fields are properly set, with defaults for missing fields
        setProperty({
          ...property,
          ...propertyData,
          Features: propertyData.Features || {}
        });

        // Setup preview images
        if (propertyData.photos && propertyData.photos.length > 0) {
          setPreviewImages(propertyData.photos.map(photo => ({
            url: `http://localhost:8800/images/${photo}`,
            name: photo,
            isExisting: true
          })));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching property:', error);
        setError('Failed to load property details. Please try again later.');
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setProperty({ ...property, [name]: checked });
    } else if (type === 'number') {
      setProperty({ ...property, [name]: value === '' ? '' : Number(value) });
    } else {
      setProperty({ ...property, [name]: value });
    }
  };

  const handleFeatureChange = (featureKey, checked) => {
    setProperty({
      ...property,
      Features: {
        ...property.Features,
        [featureKey]: checked
      }
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    // Create preview URLs
    const newPreviewImages = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      file: file,
      isExisting: false
    }));

    setPreviewImages([...previewImages, ...newPreviewImages]);
    setNewImages([...newImages, ...files]);
  };

  const removeImage = (index) => {
    const image = previewImages[index];
    
    // Create new arrays without the removed image
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);

    // If this is a new image (not from the server), remove it from newImages
    if (!image.isExisting) {
      const fileIndex = newImages.findIndex(file => file.name === image.name);
      if (fileIndex !== -1) {
        const updatedNewImages = [...newImages];
        updatedNewImages.splice(fileIndex, 1);
        setNewImages(updatedNewImages);
      }
    } else {
      // If it's an existing image, update the property.photos array
      const updatedPhotos = property.photos.filter(photo => photo !== image.name);
      setProperty({ ...property, photos: updatedPhotos });
    }
  };

  const uploadImages = async () => {
    if (newImages.length === 0) return [];

    setUploadingImages(true);
    const formData = new FormData();
    newImages.forEach(file => {
      formData.append('photos', file);
    });

    try {
      const response = await axios.post('http://localhost:8800/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadingImages(false);
      return response.data.filenames || [];
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploadingImages(false);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      // First upload any new images
      let updatedPhotos = [...property.photos];
      
      if (newImages.length > 0) {
        const uploadedFilenames = await uploadImages();
        updatedPhotos = [...updatedPhotos, ...uploadedFilenames];
      }

      // Prepare final property data
      const finalPropertyData = {
        ...property,
        photos: updatedPhotos
      };

      // Update property
      await axios.put(`http://localhost:8800/api/property/property/${id}`, finalPropertyData);
      
      setSuccessMessage('Property updated successfully!');
      setTimeout(() => {
        navigate('/listed-properties');
      }, 2000);
    } catch (error) {
      console.error('Error updating property:', error);
      setError('Failed to update property. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const tabs = [
    { name: 'Basic Details', icon: '📋' },
    { name: 'Features', icon: '✨' },
    { name: 'Location & Amenities', icon: '📍' },
    { name: 'Photos', icon: '📷' }
  ];

//   if (loading) {
//     return (
//       <div className="edit-property-container">
//         <div className="loading-state">
//           <div className="loading-spinner"></div>
//           <p>Loading property details...</p>
//         </div>
//       </div>
//     );
//   }

  if (error) {
    return (
      <div className="edit-property-container">
        <div className="error-state">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-property-container">
      <div className="edit-property-header">
        <div className="header-content">
          <h1>Edit Property</h1>
          <p>Update your property information</p>
        </div>
        <button className="save-button" onClick={handleSubmit} disabled={submitLoading}>
          {submitLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <div className="tabs-container">
        <div className="tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="tab-content">
          {/* Basic Details Tab */}
          {activeTab === 0 && (
            <div className="tab-pane">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="propertyFor">Property For</label>
                  <select 
                    id="propertyFor" 
                    name="propertyFor" 
                    value={property.propertyFor} 
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Sale">Sale</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="propertyType">Property Type</label>
                  <select 
                    id="propertyType" 
                    name="propertyType" 
                    value={property.propertyType} 
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="Location">Location</label>
                  <input 
                    type="text" 
                    id="Location" 
                    name="Location" 
                    value={property.Location} 
                    onChange={handleChange} 
                    placeholder="Enter property location"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Price">Price (₹)</label>
                  <input 
                    type="number" 
                    id="Price" 
                    name="Price" 
                    value={property.Price} 
                    onChange={handleChange} 
                    placeholder="Enter price"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Area">Area (sq.ft)</label>
                  <input 
                    type="number" 
                    id="Area" 
                    name="Area" 
                    value={property.Area} 
                    onChange={handleChange} 
                    placeholder="Enter area in sq.ft"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Bedrooms">Bedrooms</label>
                  <input 
                    type="number" 
                    id="Bedrooms" 
                    name="Bedrooms" 
                    value={property.Bedrooms} 
                    onChange={handleChange} 
                    placeholder="Number of bedrooms"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Bathrooms">Bathrooms</label>
                  <input 
                    type="number" 
                    id="Bathrooms" 
                    name="Bathrooms" 
                    value={property.Bathrooms} 
                    onChange={handleChange} 
                    placeholder="Number of bathrooms"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Age">Property Age (years)</label>
                  <input 
                    type="number" 
                    id="Age" 
                    name="Age" 
                    value={property.Age} 
                    onChange={handleChange} 
                    placeholder="Property age in years"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="FurnishedStatus">Furnished Status</label>
                  <select 
                    id="FurnishedStatus" 
                    name="FurnishedStatus" 
                    value={property.FurnishedStatus} 
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi Furnished">Semi Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="pFacing">Property Facing</label>
                  <select 
                    id="pFacing" 
                    name="pFacing" 
                    value={property.pFacing || ''} 
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North-East">North-East</option>
                    <option value="North-West">North-West</option>
                    <option value="South-East">South-East</option>
                    <option value="South-West">South-West</option>
                  </select>
                </div>

                {/* Additional fields for apartment/flat */}
                {property.propertyType === 'Apartment' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="Floornumber">Floor Number</label>
                      <input 
                        type="number" 
                        id="Floornumber" 
                        name="Floornumber" 
                        value={property.Floornumber || 0} 
                        onChange={handleChange} 
                        placeholder="Floor number"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="Flatnumber">Flat Number</label>
                      <input 
                        type="text" 
                        id="Flatnumber" 
                        name="Flatnumber" 
                        value={property.Flatnumber || ''} 
                        onChange={handleChange} 
                        placeholder="Flat number"
                      />
                    </div>
                  </>
                )}

                {/* Fields for House/Villa */}
                {(property.propertyType === 'House' || property.propertyType === 'Villa') && (
                  <div className="form-group">
                    <label htmlFor="Floors">Total Floors</label>
                    <input 
                      type="number" 
                      id="Floors" 
                      name="Floors" 
                      value={property.Floors || 0} 
                      onChange={handleChange} 
                      placeholder="Total floors"
                    />
                  </div>
                )}

                {/* Rent specific fields */}
                {property.propertyFor === 'Rent' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="MonthlyRent">Monthly Rent (₹)</label>
                      <input 
                        type="text" 
                        id="MonthlyRent" 
                        name="MonthlyRent" 
                        value={property.MonthlyRent || ''} 
                        onChange={handleChange} 
                        placeholder="Monthly rent amount"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="SecurityDeposit">Security Deposit (₹)</label>
                      <input 
                        type="number" 
                        id="SecurityDeposit" 
                        name="SecurityDeposit" 
                        value={property.SecurityDeposit || 0} 
                        onChange={handleChange} 
                        placeholder="Security deposit amount"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="MaintenanceCharges">Maintenance Charges (₹/month)</label>
                      <input 
                        type="number" 
                        id="MaintenanceCharges" 
                        name="MaintenanceCharges" 
                        value={property.MaintenanceCharges || 0} 
                        onChange={handleChange} 
                        placeholder="Monthly maintenance"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="LeaseDuration">Lease Duration (months)</label>
                      <input 
                        type="number" 
                        id="LeaseDuration" 
                        name="LeaseDuration" 
                        value={property.LeaseDuration || 0} 
                        onChange={handleChange} 
                        placeholder="Lease duration"
                      />
                    </div>
                  </>
                )}

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      id="Negotiable" 
                      name="Negotiable" 
                      checked={property.Negotiable} 
                      onChange={handleChange} 
                    />
                    <span className="label-text">Price Negotiable</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 1 && (
            <div className="tab-pane">
              <div className="features-section">
                <h3 className="section-title">Property Features</h3>
                <div className="feature-grid">
                  <div className="feature-item">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={property.Water || false} 
                        name="Water"
                        onChange={handleChange} 
                      />
                      <span className="label-text">24/7 Water Supply</span>
                    </label>
                  </div>
                  
                  <div className="feature-item">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={property.Garden || false} 
                        name="Garden"
                        onChange={handleChange} 
                      />
                      <span className="label-text">Garden</span>
                    </label>
                  </div>
                  
                  <div className="feature-item">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={property.Pool || false} 
                        name="Pool"
                        onChange={handleChange} 
                      />
                      <span className="label-text">Swimming Pool</span>
                    </label>
                  </div>
                  
                  <div className="feature-item">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={property.Parking || false} 
                        name="Parking"
                        onChange={handleChange} 
                      />
                      <span className="label-text">Parking Available</span>
                    </label>
                  </div>
                  
                  {/* Additional features from Features JSON object */}
                  {[
                    { key: 'lift', label: 'Elevator/Lift' },
                    { key: 'security', label: '24/7 Security' },
                    { key: 'gym', label: 'Gym' },
                    { key: 'powerBackup', label: 'Power Backup' },
                    { key: 'clubhouse', label: 'Clubhouse' },
                    { key: 'playground', label: 'Children\'s Playground' },
                    { key: 'joggingTrack', label: 'Jogging Track' },
                    { key: 'indoorGames', label: 'Indoor Games' },
                    { key: 'wifi', label: 'WiFi Connectivity' },
                    { key: 'gatedCommunity', label: 'Gated Community' },
                  ].map(feature => (
                    <div className="feature-item" key={feature.key}>
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={property.Features?.[feature.key] || false} 
                          onChange={(e) => handleFeatureChange(feature.key, e.target.checked)} 
                        />
                        <span className="label-text">{feature.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Location & Amenities Tab */}
          {activeTab === 2 && (
            <div className="tab-pane">
              <div className="amenities-section">
                <h3 className="section-title">Nearby Amenities</h3>
                
                {/* Railway */}
                <div className="amenity-group">
                  <h4>Railway Station</h4>
                  <div className="amenity-inputs">
                    <div className="form-group">
                      <label htmlFor="railwayAvailability">Availability</label>
                      <select 
                        id="railwayAvailability" 
                        name="railwayAvailability" 
                        value={property.railwayAvailability || 'No'} 
                        onChange={handleChange}
                      >
                        <option value="No">Not Available</option>
                        <option value="Yes">Available</option>
                      </select>
                    </div>
                    
                    {property.railwayAvailability === 'Yes' && (
                      <>
                        <div className="form-group">
                          <label htmlFor="railwayDistance">Distance</label>
                          <input 
                            type="text" 
                            id="railwayDistance" 
                            name="railwayDistance" 
                            value={property.railwayDistance || ''} 
                            onChange={handleChange} 
                            placeholder="Distance"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="railwayDistanceUnit">Unit</label>
                          <select 
                            id="railwayDistanceUnit" 
                            name="railwayDistanceUnit" 
                            value={property.railwayDistanceUnit || 'km'} 
                            onChange={handleChange}
                          >
                            <option value="km">km</option>
                            <option value="m">m</option>
                            <option value="mi">mi</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Hospital */}
                <div className="amenity-group">
                  <h4>Hospital</h4>
                  <div className="amenity-inputs">
                    <div className="form-group">
                      <label htmlFor="hospitalAvailability">Availability</label>
                      <select 
                        id="hospitalAvailability" 
                        name="hospitalAvailability" 
                        value={property.hospitalAvailability || 'No'} 
                        onChange={handleChange}
                      >
                        <option value="No">Not Available</option>
                        <option value="Yes">Available</option>
                      </select>
                    </div>
                    
                    {property.hospitalAvailability === 'Yes' && (
                      <>
                        <div className="form-group">
                          <label htmlFor="hospitalDistance">Distance</label>
                          <input 
                            type="text" 
                            id="hospitalDistance" 
                            name="hospitalDistance" 
                            value={property.hospitalDistance || ''} 
                            onChange={handleChange} 
                            placeholder="Distance"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="hospitalDistanceUnit">Unit</label>
                          <select 
                            id="hospitalDistanceUnit" 
                            name="hospitalDistanceUnit" 
                            value={property.hospitalDistanceUnit || 'km'} 
                            onChange={handleChange}
                          >
                            <option value="km">km</option>
                            <option value="m">m</option>
                            <option value="mi">mi</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Bus Stand */}
                <div className="amenity-group">
                  <h4>Bus Stand</h4>
                  <div className="amenity-inputs">
                    <div className="form-group">
                      <label htmlFor="busStandAvailability">Availability</label>
                      <select 
                        id="busStandAvailability" 
                        name="busStandAvailability" 
                        value={property.busStandAvailability || 'No'} 
                        onChange={handleChange}
                      >
                        <option value="No">Not Available</option>
                        <option value="Yes">Available</option>
                      </select>
                    </div>
                    
                    {property.busStandAvailability === 'Yes' && (
                      <>
                        <div className="form-group">
                          <label htmlFor="busStandDistance">Distance</label>
                          <input 
                            type="text" 
                            id="busStandDistance" 
                            name="busStandDistance" 
                            value={property.busStandDistance || ''} 
                            onChange={handleChange} 
                            placeholder="Distance"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="busStandDistanceUnit">Unit</label>
                          <select 
                            id="busStandDistanceUnit" 
                            name="busStandDistanceUnit" 
                            value={property.busStandDistanceUnit || 'km'} 
                            onChange={handleChange}
                          >
                            <option value="km">km</option>
                            <option value="m">m</option>
                            <option value="mi">mi</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* School */}
                <div className="amenity-group">
                  <h4>School</h4>
                  <div className="amenity-inputs">
                    <div className="form-group">
                      <label htmlFor="schoolAvailability">Availability</label>
                      <select 
                        id="schoolAvailability" 
                        name="schoolAvailability" 
                        value={property.schoolAvailability || 'No'} 
                        onChange={handleChange}
                      >
                        <option value="No">Not Available</option>
                        <option value="Yes">Available</option>
                      </select>
                    </div>
                    
                    {property.schoolAvailability === 'Yes' && (
                      <>
                        <div className="form-group">
                          <label htmlFor="schoolDistance">Distance</label>
                          <input 
                            type="text" 
                            id="schoolDistance" 
                            name="schoolDistance" 
                            value={property.schoolDistance || ''} 
                            onChange={handleChange} 
                            placeholder="Distance"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="schoolDistanceUnit">Unit</label>
                          <select 
                            id="schoolDistanceUnit" 
                            name="schoolDistanceUnit" 
                            value={property.schoolDistanceUnit || 'km'} 
                            onChange={handleChange}
                          >
                            <option value="km">km</option>
                            <option value="m">m</option>
                            <option value="mi">mi</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Restaurant */}
                <div className="amenity-group">
                  <h4>Restaurant</h4>
                  <div className="amenity-inputs">
                    <div className="form-group">
                      <label htmlFor="restaurantlAvailability">Availability</label>
                      <select 
                        id="restaurantlAvailability" 
                        name="restaurantlAvailability" 
                        value={property.restaurantlAvailability || 'No'} 
                        onChange={handleChange}
                      >
                        <option value="No">Not Available</option>
                        <option value="Yes">Available</option>
                      </select>
                    </div>
                    
                    {property.restaurantlAvailability === 'Yes' && (
                      <>
                        <div className="form-group">
                          <label htmlFor="restaurantDistance">Distance</label>
                          <input 
                            type="text" 
                            id="restaurantDistance" 
                            name="restaurantDistance" 
                            value={property.restaurantDistance || ''} 
                            onChange={handleChange} 
                            placeholder="Distance"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="restaurantDistanceUnit">Unit</label>
                          <select 
                            id="restaurantDistanceUnit" 
                            name="restaurantDistanceUnit" 
                            value={property.restaurantDistanceUnit || 'km'} 
                            onChange={handleChange}
                          >
                            <option value="km">km</option>
                            <option value="m">m</option>
                            <option value="mi">mi</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 3 && (
            <div className="tab-pane">
              <div className="photos-section">
                <h3 className="section-title">Property Photos</h3>
                
                <div className="upload-container">
                  <label htmlFor="photo-upload" className="upload-label">
                    <div className="upload-icon">📷</div>
                    <span>Upload Photos</span>
                    <small>Click to add more photos (max 10)</small>
                  </label>
                  <input 
                    type="file" 
                    id="photo-upload" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="file-input" 
                  />
                </div>

                <div className="photos-preview">
                  {previewImages.length > 0 ? (
                    <div className="image-grid">
                      {previewImages.map((image, index) => (
                        <div className="image-item" key={index}>
                          <img src={image.url} alt={`Property image ${index + 1}`} />
                          <button 
                            type="button" 
                            className="remove-image-btn" 
                            onClick={() => removeImage(index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-photos">
                      <p>No photos uploaded yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="button" 
          className="cancel-button" 
          onClick={() => navigate('/listed-properties')}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="submit-button" 
          onClick={handleSubmit} 
          disabled={submitLoading || uploadingImages}
        >
          {submitLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default EditProperty;