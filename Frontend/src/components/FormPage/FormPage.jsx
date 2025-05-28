import React, { useState } from "react";
import axios from "axios";
import "./FormPage.css";

const FormPage = () => {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [propertyFor, setPropertyFor] = useState("");
  const [description, setDescription] = useState("");
  
  const [formData, setFormData] = useState({
    propertyFor: "",
    propertyType: "",
    Location: "",
    Bedrooms: "",
    Bathrooms: "",
    Area: "",
    Price: "",
    Negotiable: false,
    FurnishedStatus: "",
    Age: "",
    Floornumber: "",
    SecurityDeposit: "",
    Pfacing: "",
    Monthlyrent: "",
    MaintenanceCharges: "",
    Flatnumber: "",
    LeaseDuration: "",
    Floors: "",
    Water: false,
    Pool: false,
    Garden: false,
    Parking: false,
    Security: false,
    Power: false,
    FireSafety: false,
    Air: false,
    Wifi: false,
    Mattress: false,
    Meals: false,
    Fridge: false,
    Balcony: false,
    Gated: false,
    railwayAvailability: false,
    railwayDistance: '',
    railwayDistanceUnit: 'km',
    schoolAvailability: false,
    schoolDistance: '',
    schoolDistanceUnit: 'km',
    restaurantAvailability: false,
    restaurantDistance: '',
    restaurantDistanceUnit: 'km',
    hospitalAvailability: false,
    hospitalDistance: '',
    hospitalDistanceUnit: 'km',
    busStandAvailability: false,
    busStandDistance: '',
    busStandDistanceUnit: 'km',
    Features: {},
    photos: [],
  });

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (name === "propertyType") {
      setSelectedPropertyType(value);
      setShowAdditionalFields(true);
    }
  
    if (name === 'propertyFor') {
      setPropertyFor(value);
    }
  
    // Convert negative numbers to positive for numeric fields
    const numericFields = [
      'Price', 'Area', 'SecurityDeposit', 'MaintenanceCharges',
      'Monthlyrent', 'Floornumber', 'Flatnumber', 'Age',
      'railwayDistance', 'hospitalDistance', 'busStandDistance',
      'schoolDistance', 'restaurantDistance'
    ];
    if (numericFields.includes(name)) {
      const numberValue = Number(value);
      const sanitizedValue = numberValue < 0 ? Math.abs(numberValue).toString() : value;
      setFormData(prevData => ({
        ...prevData,
        [name]: sanitizedValue
      }));
      return;
    }
    
  
    // Special handling for nearby facility checkboxes
    if (type === "checkbox" && name.endsWith("Availability")) {
      const distanceField = name.replace("Availability", "Distance");
      setFormData(prevData => ({
        ...prevData,
        [name]: checked,
        [distanceField]: checked ? "1" : ""
      }));
      return;
    }
  
    // Standard checkbox and other inputs
    if (type === "checkbox") {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };
  

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevData => ({
      ...prevData,
      photos: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.railwayDistance < 0) {
      formData.railwayDistance = Math.abs(formData.railwayDistance);
    }
    if (formData.hospitalDistance < 0) {
      formData.hospitalDistance = Math.abs(formData.hospitalDistance);
    }

    try {
      const formDataObject = new FormData();

      const fullData = {
        ...formData,
        Bedrooms: formData.Bedrooms ? Number(formData.Bedrooms) : null,
        Bathrooms: formData.Bathrooms ? Number(formData.Bathrooms) : null,
        Area: formData.Area ? Number(formData.Area) : null,
        Price: formData.Price ? Number(formData.Price) : null,
        SecurityDeposit: formData.SecurityDeposit ? Number(formData.SecurityDeposit) : 0,
        MaintenanceCharges: formData.MaintenanceCharges ? Number(formData.MaintenanceCharges) : 0,
        LeaseDuration: formData.LeaseDuration ? Number(formData.LeaseDuration) : 0,
        Age: formData.Age ? Number(formData.Age) : null,
        Floors: formData.Floors ? Number(formData.Floors) : 0,
        Flatnumber: formData.Flatnumber ? Number(formData.Flatnumber) : 0,
        Floornumber: formData.Floornumber ? Number(formData.Floornumber) : 0,
        Monthlyrent: formData.Monthlyrent ? Number(formData.Monthlyrent) : 0,
        Negotiable: Boolean(formData.Negotiable),
        Water: Boolean(formData.Water),
        Pool: Boolean(formData.Pool),
        Security: Boolean(formData.Security),
        Power: Boolean(formData.Power),
        FireSafety: Boolean(formData.FireSafety),
        Air: Boolean(formData.Air),
        Wifi: Boolean(formData.Wifi),
        Mattress: Boolean(formData.Mattress),
        Meals: Boolean(formData.Meals),
        Fridge: Boolean(formData.Fridge),
        Balcony: Boolean(formData.Balcony),
        Gated: Boolean(formData.Gated),
        Garden: Boolean(formData.Garden),
        Parking: Boolean(formData.Parking),
        railwayAvailability: Boolean(formData.railwayAvailability),
        railwayDistance: formData.railwayDistance || null,
        railwayDistanceUnit: formData.railwayDistanceUnit || null,
        hospitalAvailability: Boolean(formData.hospitalAvailability),
        hospitalDistance: formData.hospitalDistance || null,
        hospitalDistanceUnit: formData.hospitalDistanceUnit || null,
        busStandAvailability: Boolean(formData.busStandAvailability),
        busStandDistance: formData.busStandDistance || null,
        busStandDistanceUnit: formData.busStandDistanceUnit || null,
        schoolAvailability: Boolean(formData.schoolAvailability),
        schoolDistance: formData.schoolDistance || null,
        schoolDistanceUnit: formData.schoolDistanceUnit || null,
        restaurantAvailability: Boolean(formData.restaurantAvailability),
        restaurantDistance: formData.restaurantDistance || null,
        restaurantDistanceUnit: formData.restaurantDistanceUnit || null,
        Pfacing: formData.Pfacing || null,
        description: description || "",
        Features: formData.Features || {},
        photos: formData.photos || [],
      };
      
      const allowedFields = [
        "propertyFor", "propertyType", "Location", "Bedrooms", "Bathrooms", "Area",
        "Price", "SecurityDeposit", "MaintenanceCharges", "LeaseDuration", "Floors",
        "Age", "FurnishedStatus", "Negotiable", "Garden", "Parking", "Features",
        "photos", "railwayAvailability", "railwayDistance", "railwayDistanceUnit",
        "hospitalAvailability", "hospitalDistance", "hospitalDistanceUnit",
        "busStandAvailability", "busStandDistance", "busStandDistanceUnit",
        "schoolAvailability", "schoolDistance", "schoolDistanceUnit",
        "restaurantAvailability", "restaurantDistance", "restaurantDistanceUnit",
        "Pfacing", "description", "Water", "Pool", "Security", "Power", "FireSafety",
        "Air", "Wifi", "Mattress", "Meals", "Fridge", "Balcony", "Gated"
      ];
      
      const processedData = {};
      allowedFields.forEach((key) => {
        if (key in fullData) {
          processedData[key] = fullData[key];
        }
      });
      
      Object.keys(processedData).forEach((key) => {
        if (key === "photos") {
          formData.photos.forEach((file) => formDataObject.append("photos", file));
        } else if (typeof processedData[key] === "object" && processedData[key] !== null) {
          formDataObject.append(key, JSON.stringify(processedData[key]));
        } else {
          formDataObject.append(key, processedData[key]);
        }
      });

      // formDataObject.append("description", description || "");

      const response = await axios.post("http://localhost:8800/api/property/properties", formDataObject, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Property created successfully!", response.data);
      alert("Property Listed Successfully!");
    } catch (error) {
      console.error("❌ Error submitting property:", error.response?.data || error);
      alert("Failed to list property. Check console for details.");
    }
  };

  return (
    <div className="property-listing-container">
      <form onSubmit={handleSubmit} className="property-listing-form">
        <h2 className="form-title">Property Listing Form</h2>

        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>
                For:
                <select 
                  name="propertyFor" 
                  value={formData.propertyFor} 
                  onChange={handleChange} 
                  required
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option value="Sale">Sale</option>
                  <option value="Rent">Rent</option>
                </select>
              </label>
            </div>
            
            <div className="form-group">
              <label>
                Property Type:
                <select 
                  name="propertyType" 
                  value={formData.propertyType} 
                  onChange={handleChange} 
                  required
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option value="Flat">Flat</option>
                  <option value="PG">PG</option>
                  <option value="House">House</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {showAdditionalFields && (
          <>
            <div className="form-section">
              <h3 className="section-title">Property Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Location:
                    <input 
                      type="text" 
                      name="Location" 
                      value={formData.Location} 
                      onChange={handleChange} 
                      required 
                      className="form-input"
                    />
                  </label>
                </div>
                
                <div className="form-group">
                  <label>
                    Furnished Status:
                    <select 
                      name="FurnishedStatus" 
                      value={formData.FurnishedStatus} 
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select</option>
                      <option value="Full">Full</option>
                      <option value="Semi">Semi</option>
                      <option value="Unfurnished">Unfurnished</option>
                    </select>
                  </label>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Area (in Sq ft):
                    <input 
                      type="number" 
                      name="Area" 
                      value={formData.Area} 
                      onChange={handleChange} 
                      required 
                      min="0" 
                      className="form-input"
                    />
                  </label>
                </div>
                
                <div className="form-group">
                  <label>
                    Age of Property:
                    <input 
                      type="number" 
                      name="Age" 
                      value={formData.Age} 
                      onChange={handleChange} 
                      required 
                      min="0" 
                      className="form-input"
                    />
                  </label>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Number of Bedrooms:
                    <select 
                      name="Bedrooms" 
                      value={formData.Bedrooms} 
                      onChange={handleChange} 
                      required
                      className="form-select"
                    >
                      <option value="">Select</option>
                      {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                  </label>
                </div>
                
                <div className="form-group">
                  <label>
                    Number of Bathrooms:
                    <select 
                      name="Bathrooms" 
                      value={formData.Bathrooms} 
                      onChange={handleChange} 
                      required
                      className="form-select"
                    >
                      <option value="">Select</option>
                      {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Property Facing:
                    <select 
                      name="Pfacing" 
                      value={formData.Pfacing} 
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select</option>
                      <option value="North">North</option>
                      <option value="South">South</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            {/* FLAT SPECIFIC FIELDS */}
            {selectedPropertyType === "Flat" && (
              <div className="form-section">
                <h3 className="section-title">Flat Details</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Flat Number:
                      <select 
                        name="Flatnumber" 
                        value={formData.Flatnumber} 
                        onChange={handleChange} 
                        required
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <label>
                      Floor Number:
                      <select 
                        name="Floornumber" 
                        value={formData.Floornumber} 
                        onChange={handleChange} 
                        required
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
                
                {propertyFor === 'Rent' && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          Security Deposit:
                          <input 
                            type="number" 
                            name="SecurityDeposit" 
                            value={formData.SecurityDeposit} 
                            onChange={handleChange} 
                            required 
                            min="0" 
                            className="form-input"
                          />
                        </label>
                      </div>
                      
                      <div className="form-group">
                        <label>
                          Maintenance Charges:
                          <input 
                            type="number" 
                            name="MaintenanceCharges" 
                            value={formData.MaintenanceCharges} 
                            onChange={handleChange} 
                            required 
                            min="0" 
                            className="form-input"
                          />
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          Monthly Rent:
                          <input 
                          type="number" 
                          name="Price" 
                          value={formData.Price} 
                          onChange={handleChange} 
                          required 
                          className="form-input"
                        />
                        </label>
                      </div>
                      
                      <div className="form-group">
                        <label>
                          Lease Duration (months):
                          <select 
                            name="LeaseDuration" 
                            value={formData.LeaseDuration} 
                            onChange={handleChange} 
                            required
                            className="form-select"
                          >
                            <option value="">Select</option>
                            {[...Array(12)].map((_, index) => (
                              <option key={index + 1} value={index + 1}>{index + 1}</option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                  </>
                )}
                
                {propertyFor === 'Sale' && (
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Price:
                        <input 
                          type="number" 
                          name="Price" 
                          value={formData.Price} 
                          onChange={handleChange} 
                          required 
                          className="form-input"
                        />
                      </label>
                    </div>
                  </div>
                )}
                
                <div className="form-row">
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        name="Negotiable" 
                        checked={formData.Negotiable} 
                        onChange={handleChange} 
                        className="form-checkbox"
                      />
                      Negotiable
                    </label>
                  </div>
                </div>
                
                <div className="form-row">
                  <h4 className="subsection-title">Amenities</h4>
                  <div className="checkbox-grid">
                    <label className="checkbox-label">
                      <input type="checkbox" name="Water" checked={formData.Water} onChange={handleChange} />
                      24x7 Water Supply
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Pool" checked={formData.Pool} onChange={handleChange} />
                      Swimming Pool
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Security" checked={formData.Security} onChange={handleChange} />
                      Security
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Power" checked={formData.Power} onChange={handleChange} />
                      Power Backup
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Parking" checked={formData.Parking} onChange={handleChange} />
                      Visitor Parking
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="FireSafety" checked={formData.FireSafety} onChange={handleChange} />
                      Fire Safety
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* PG SPECIFIC FIELDS */}
            {selectedPropertyType === 'PG' && (
              <div className="form-section">
                <h3 className="section-title">PG Details</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Number of Sharing:
                      <select 
                        name="NumberofSharing" 
                        value={formData.NumberofSharing} 
                        onChange={handleChange} 
                        required
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <label>
                      Food Available:
                      <select 
                        name="foodAvailable" 
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </label>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Price:
                      <input 
                        type="number" 
                        name="Price" 
                        value={formData.Price} 
                        onChange={handleChange} 
                        required 
                        className="form-input"
                      />
                    </label>
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        name="Negotiable" 
                        checked={formData.Negotiable} 
                        onChange={handleChange} 
                      />
                      Negotiable
                    </label>
                  </div>
                </div>
                
                <div className="form-row">
                  <h4 className="subsection-title">Amenities</h4>
                  <div className="checkbox-grid">
                    <label className="checkbox-label">
                      <input type="checkbox" name="Air" checked={formData.Air} onChange={handleChange} />
                      Air Conditioning
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Wifi" checked={formData.Wifi} onChange={handleChange} />
                      Wi-Fi
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Power" checked={formData.Power} onChange={handleChange} />
                      Power Backup
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Mattress" checked={formData.Mattress} onChange={handleChange} />
                      Mattress Provided
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Meals" checked={formData.Meals} onChange={handleChange} />
                      Meals Included
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Parking" checked={formData.Parking} onChange={handleChange} />
                      Parking
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Fridge" checked={formData.Fridge} onChange={handleChange} />
                      Fridge/Microwave
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="FireSafety" checked={formData.FireSafety} onChange={handleChange} />
                      Fire Safety
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* HOUSE SPECIFIC FIELDS */}
            {selectedPropertyType === "House" && (
              <div className="form-section">
                <h3 className="section-title">House Details</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Floors in House:
                      <select 
                        name="Floors" 
                        value={formData.Floors} 
                        onChange={handleChange} 
                        required
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
                
                {propertyFor === 'Rent' && (
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Security Deposit:
                        <input 
                          type="number" 
                          name="SecurityDeposit" 
                          value={formData.SecurityDeposit} 
                          onChange={handleChange} 
                          required 
                          min="0" 
                          className="form-input"
                        />
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label>
                        Maintenance Charges:
                        <input 
                          type="number" 
                          name="MaintenanceCharges" 
                          value={formData.MaintenanceCharges} 
                          onChange={handleChange} 
                          required 
                          min="0" 
                          className="form-input"
                        />
                      </label>
                    </div>
                  </div>
                )}
                
                {propertyFor === 'Rent' && (
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Monthly Rent:
                        <input 
                          type="number" 
                          name="Monthlyrent" 
                          value={formData.Monthlyrent} 
                          onChange={handleChange} 
                          required 
                          min="0" 
                          className="form-input"
                        />
                      </label>
                    </div>
                  </div>
                )}
                
                {propertyFor === 'Sale' && (
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Price:
                        <input 
                          type="number" 
                          name="Price" 
                          value={formData.Price} 
                          onChange={handleChange} 
                          required 
                          className="form-input"
                        />
                      </label>
                    </div>
                  </div>
                )}
                
                <div className="form-row">
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        name="Negotiable" 
                        checked={formData.Negotiable} 
                        onChange={handleChange} 
                      />
                      Negotiable
                    </label>
                  </div>
                </div>
                
                <div className="form-row">
                  <h4 className="subsection-title">Amenities</h4>
                  <div className="checkbox-grid">
                    <label className="checkbox-label">
                      <input type="checkbox" name="Garden" checked={formData.Garden} onChange={handleChange} />
                      Garden
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Parking" checked={formData.Parking} onChange={handleChange} />
                      Parking
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Balcony" checked={formData.Balcony} onChange={handleChange} />
                      Balcony
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="Gated" checked={formData.Gated} onChange={handleChange} />
                      Gated Community
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="FireSafety" checked={formData.FireSafety} onChange={handleChange} />
                      Fire Safety
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* NEARBY FACILITIES */}
            <div className="form-section">
              <h3 className="section-title">Nearby Facilities</h3>
              
              <div className="facility-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="railwayAvailability" 
                    checked={formData.railwayAvailability} 
                    onChange={handleChange} 
                  />
                  Railway Station Available
                </label>
                {formData.railwayAvailability && (
                  <div className="distance-group">
                    <input 
                      type="number" 
                      name="railwayDistance" 
                      value={formData.railwayDistance} 
                      onChange={handleChange} 
                      placeholder="Distance"
                      className="distance-input"
                    />
                    <select 
                      name="railwayDistanceUnit" 
                      value={formData.railwayDistanceUnit} 
                      onChange={handleChange}
                      className="distance-unit"
                    >
                      <option value="m">m</option>
                      <option value="km">km</option>
                    </select>
                  </div>
                )}
              </div>
              
              <div className="facility-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="hospitalAvailability" 
                    checked={formData.hospitalAvailability} 
                    onChange={handleChange} 
                  />
                  Hospital Available
                </label>
                {formData.hospitalAvailability && (
                  <div className="distance-group">
                    <input 
                      type="number" 
                      name="hospitalDistance" 
                      value={formData.hospitalDistance} 
                      onChange={handleChange} 
                      placeholder="Distance"
                      className="distance-input"
                    />
                    <select 
                      name="hospitalDistanceUnit" 
                      value={formData.hospitalDistanceUnit} 
                      onChange={handleChange}
                      className="distance-unit"
                    >
                      <option value="m">m</option>
                      <option value="km">km</option>
                    </select>
                  </div>
                )}
              </div>
              
              <div className="facility-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="busStandAvailability" 
                    checked={formData.busStandAvailability} 
                    onChange={handleChange} 
                  />
                  Bus Stand Available
                </label>
                {formData.busStandAvailability && (
                  <div className="distance-group">
                    <input 
                      type="number" 
                      name="busStandDistance" 
                      value={formData.busStandDistance} 
                      onChange={handleChange} 
                      placeholder="Distance"
                      className="distance-input"
                    />
                    <select 
                      name="busStandDistanceUnit" 
                      value={formData.busStandDistanceUnit} 
                      onChange={handleChange}
                      className="distance-unit"
                    >
                      <option value="m">m</option>
                      <option value="km">km</option>
                    </select>
                  </div>
                )}
              </div>
              
              <div className="facility-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="schoolAvailability" 
                    checked={formData.schoolAvailability} 
                    onChange={handleChange} 
                  />
                  School Available
                </label>
                {formData.schoolAvailability && (
                  <div className="distance-group">
                    <input 
                      type="number" 
                      name="schoolDistance" 
                      value={formData.schoolDistance} 
                      onChange={handleChange} 
                      placeholder="Distance"
                      className="distance-input"
                    />
                    <select 
                      name="schoolDistanceUnit" 
                      value={formData.schoolDistanceUnit} 
                      onChange={handleChange}
                      className="distance-unit"
                    >
                      <option value="m">m</option>
                      <option value="km">km</option>
                    </select>
                  </div>
                )}
              </div>
              
              <div className="facility-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="restaurantAvailability" 
                    checked={formData.restaurantAvailability} 
                    onChange={handleChange} 
                  />
                  Restaurant Available
                </label>
                {formData.restaurantAvailability && (
                  <div className="distance-group">
                    <input 
                      type="number" 
                      name="restaurantDistance" 
                      value={formData.restaurantDistance} 
                      onChange={handleChange} 
                      placeholder="Distance"
                      className="distance-input"
                    />
                    <select 
                      name="restaurantDistanceUnit" 
                      value={formData.restaurantDistanceUnit} 
                      onChange={handleChange}
                      className="distance-unit"
                    >
                      <option value="m">m</option>
                      <option value="km">km</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* DESCRIPTION AND PHOTOS */}
            <div className="form-section">
              <h3 className="section-title">Additional Information</h3>
              
              <div className="form-row">
                <div className="form-group full-width">
                  <label>
                    Property Description:
                    <textarea 
                      name="description" 
                      value={description} 
                      onChange={handleDescriptionChange}
                      rows="5"
                      placeholder="Enter detailed property description..."
                      className="form-textarea"
                    />
                  </label>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group full-width">
                  <label>
                    Photos:
                    <input 
                      type="file" 
                      multiple 
                      onChange={handleFileChange} 
                      className="form-file"
                    />
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="form-actions">
          <button type="submit" className="submit-button">Submit Property</button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;