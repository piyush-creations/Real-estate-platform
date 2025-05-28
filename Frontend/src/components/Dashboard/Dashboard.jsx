import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Dp from '../../Assets/images/dp.jpg';
import Footer from '../Footer/Footer';
import { FaUser, FaEnvelope, FaPhone, FaGenderless, FaBriefcase, FaCalendarAlt, FaBuilding, FaBookmark, FaCog, FaChartBar } from 'react-icons/fa';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (!email) {
            setError('No email found. Please log in again.');
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/profile?email=${email}`);
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8800/api/auth/logout', {}, { withCredentials: true });
            localStorage.clear();
            navigate('/signin');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    if (loading) return <div className="loading-state80">Loading user data...</div>;
    if (error) return <div className="error-state80">{error}</div>;

    return (
        <div className="dashboard-wrapper80">
            <div className="dashboard-header80">
                <div className="header-content80">
                    <h1>Dashboard</h1>
                    <p>Welcome back, {user.username}</p>
                </div>
            </div>
            
            <div className="dashboard-container80">
                <div className="dashboard-sidebar80">
                    <div className="profile-card80">
                        <div className="profile-header80">
                            <div className="profile-image80">
                                <img src={user.profilePicture ? user.profilePicture : Dp} alt={user.username} />
                            </div>
                            <div className="profile-info80">
                                <h2>{user.username}</h2>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        
                        <div className="profile-details80">
                            <div className="detail-item80">
                                <FaPhone className="detail-icon80" />
                                <span>{user.contact || 'Not Provided'}</span>
                            </div>
                            <div className="detail-item80">
                                <FaGenderless className="detail-icon80" />
                                <span>{user.gender || 'Not Specified'}</span>
                            </div>
                            <div className="detail-item80">
                                <FaCalendarAlt className="detail-icon80" />
                                <span>{user.dob || 'Not Provided'}</span>
                            </div>
                            <div className="detail-item80">
                                <FaBriefcase className="detail-icon80" />
                                <span>{user.occupation || 'Not Provided'}</span>
                            </div>
                        </div>
                        
                        <div className="profile-actions80">
                            <button 
                                className="btn80 primary-btn80" 
                                onClick={() => navigate('/edit-profile')}
                            >
                                Edit Profile
                            </button>
                            <button 
                                className="btn80 secondary-btn80" 
                                onClick={handleLogout}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="dashboard-main80">
                    <div className="quick-actions80">
                        <h2>Quick Actions</h2>
                        <div className="action-cards80">
                            <div 
                                className="action-card80"
                                onClick={() => navigate('/formpage')}
                            >
                                <div className="card-icon80 property-icon80">
                                    <FaBuilding />
                                </div>
                                <div className="card-content80">
                                    <h3>List Property</h3>
                                    <p>Advertise Your Property Here</p>
                                </div>
                            </div>
                            
                            <div 
                                className="action-card80"
                                onClick={() => navigate('/saved-posts')}
                            >
                                <div className="card-icon80 saved-icon80">
                                    <FaBookmark />
                                </div>
                                <div className="card-content80">
                                    <h3>Saved Listings</h3>
                                    <p>View your saved properties</p>
                                </div>
                            </div>
                            
                            <div 
                                className="action-card80"
                                onClick={() => navigate('/edit-profile')}
                            >
                                <div className="card-icon80 settings-icon80">
                                    <FaCog />
                                </div>
                                <div className="card-content80">
                                    <h3>Edit Profile</h3>
                                    <p>Update your details</p>
                                </div>
                            </div>
                            
                            <div 
                                className="action-card80"
                                onClick={() => navigate('/area-converter')}
                            >
                                <div className="card-icon80 insights-icon80">
                                    <FaChartBar />
                                </div>
                                <div className="card-content80">
                                    <h3>Unit Converter</h3>
                                    <p>Convert units with ease</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default UserDashboard;