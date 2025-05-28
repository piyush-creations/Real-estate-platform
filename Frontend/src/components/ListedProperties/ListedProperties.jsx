import React, { useState, useEffect } from 'react';
import './ListedProperties.css';
import axios from 'axios';

const ListedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [view, setView] = useState('grid'); // grid or list view
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8800/api/property/my-properties');
      setProperties(response.data.properties);
      setError(null);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load your properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async () => {
    console.log("🧪 handleDeleteProperty called");
  
    if (!propertyToDelete || !propertyToDelete.id) {
      console.warn("❌ Invalid propertyToDelete:", propertyToDelete);
      return;
    }
  
    const propertyId = propertyToDelete.id;
    console.log("📦 Deleting property ID:", propertyId);
  
    try {
      setDeleteLoading(true);
  
      const response = await axios.delete(`http://localhost:8800/api/property/property/${propertyId}`, {
        withCredentials: true, // only if your backend uses sessions
      });
  
      console.log("✅ Delete successful:", response.data);
  
      // Update frontend state
      setProperties(prev => prev.filter(p => p._id !== propertyId));
      setDeleteModalOpen(false);
      setPropertyToDelete(null);
    } catch (error) {
      console.error("❌ Error deleting property:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
      alert('Failed to delete property. Check console for more info.');
    } finally {
      setDeleteLoading(false);
    }
  };
  
  

  const openDeleteModal = (property) => {
    console.log("🧨 Property to delete:", property);
    setPropertyToDelete(property);
    setDeleteModalOpen(true);
  };

  const getImageURI = (imagePath) => {
    return `http://localhost:8800/images/${imagePath}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const filteredProperties = properties.filter(property => {
    const title = property.title || '';
    const location = property.Location || '';
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch(sortBy) {
      case 'price-high':
        return b.Price - a.Price;
      case 'price-low':
        return a.Price - b.Price;
      case 'newest':
        return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
      case 'oldest':
        return new Date(a.createdAt || Date.now()) - new Date(b.createdAt || Date.now());
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-state">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={fetchProperties}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Property Management</h1>
          <p className="subtitle">Manage and track your listed properties</p>
        </div>
        <button className="add-property-btn">
          <i className="plus-icon">+</i> Add New Property
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-value">{properties.length}</span>
          <span className="stat-label">Total Properties</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{properties.filter(p => p.status === 'active').length}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{properties.filter(p => p.status === 'pending').length || 0}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>

      <div className="filters-bar">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search properties..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters-right">
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </select>
          <div className="view-toggle">
            <button 
              className={`view-btn ${view === 'grid' ? 'active' : ''}`}
              onClick={() => setView('grid')}
            >
              <i className="grid-icon">□</i>
            </button>
            <button 
              className={`view-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              <i className="list-icon">≡</i>
            </button>
          </div>
        </div>
      </div>
      
      {properties.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No Properties Found</h3>
          <p>You haven't listed any properties yet. Get started by adding your first property.</p>
          <button className="add-property-btn-empty">Add Your First Property</button>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No Matching Properties</h3>
          <p>No properties match your search criteria. Try adjusting your filters.</p>
          <button className="clear-filters-btn" onClick={() => setSearchTerm('')}>Clear Filters</button>
        </div>
      ) : (
        <div className={`properties-container ${view === 'list' ? 'list-view' : 'grid-view'}`}>
          {sortedProperties.map((property) => (
            <div key={property._id} className="property-card">
              <div className="property-image-container">
                <img
                  className="property-image"
                  src={property.photos?.[0] ? getImageURI(property.photos[0]) : "/fallback-image.jpg"}
                  alt={property.title}
                />
                {property.status && (
                  <span className={`status-badge status-${property.status || 'active'}`}>
                    {property.status || 'Active'}
                  </span>
                )}
              </div>
              <div className="property-info">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-price">{formatPrice(property.Price)}</p>
                <p className="property-location">
                  <i className="location-icon">📍</i> {property.Location}
                </p>
                <div className="property-details">
                  {property.BHK && <span><i className="bed-icon">🛏️</i> {property.BHK} BHK</span>}
                  {property.Size && <span><i className="size-icon">📐</i> {property.Size} sq.ft</span>}
                  {property.createdAt && (
                    <span className="listing-date">
                      <i className="calendar-icon">📅</i> {formatDate(property.createdAt)}
                    </span>
                  )}
                </div>
                <div className="property-actions">
                  <button className="action-btn view-btn-action">
                    <i className="view-icon">👁️</i> View
                  </button>
                  <button className="action-btn edit-btn">
                    <i className="edit-icon">✏️</i> Edit
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => openDeleteModal(property)}
                  >
                    <i className="delete-icon">🗑️</i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete <strong>{propertyToDelete?.title}</strong>?</p>
            <p className="modal-warning">This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel-btn" 
                onClick={() => setDeleteModalOpen(false)}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button 
                className="modal-btn delete-confirm-btn" 
                onClick={handleDeleteProperty}
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'Delete Property'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination (simplified) */}
      {properties.length > 0 && (
        <div className="pagination">
          <button className="pagination-btn" disabled>Previous</button>
          <span className="pagination-info">Page 1 of 1</span>
          <button className="pagination-btn" disabled>Next</button>
        </div>
      )}
    </div>
  );
};

export default ListedProperties;