import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer02 = () => {
    return (
        <footer className="footer02">
            <div className="footer-container02">
                <div className="footer-section02">
                    <h4>About UniUrbanEstate</h4>
                    <p>
                        Welcome to UniUrbanEstate, where your dream home becomes a reality.
                        Our platform is committed to providing you with a seamless and 
                        hassle-free property buying experience with expert guidance every 
                        step of the way.
                    </p>
                    <div className="social-links02">
                        <a href="#" className="social-icon02"><FaFacebookF /></a>
                        <a href="#" className="social-icon02"><FaTwitter /></a>
                        <a href="#" className="social-icon02"><FaInstagram /></a>
                        <a href="#" className="social-icon02"><FaLinkedinIn /></a>
                    </div>
                </div>
                
                <div className="footer-section02">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="Property-List">Properties</a></li>
                        <li><a href="About">About</a></li>
                        
                    </ul>
                </div>
                
                <div className="footer-section02">
                    <h4>Our Services</h4>
                    <ul>
                        <li><a href="Property-List">Buying Property</a></li>
                        <li><a href="FormPage">Selling Property</a></li>
                       
                        <li><a href="Area-Converter">Unit Converter</a></li>
                       
                    </ul>
                </div>

                <div className="footer-section02">
                    <h4>Contact Us</h4>
                    <div className="contact-info02">
                        <div className="contact-item02">
                            <span className="contact-icon02"><FaMapMarkerAlt /></span>
                            <span>123 UniUrban, Allahabad, UP</span>
                        </div>
                        <div className="contact-item02">
                            <span className="contact-icon02"><FaPhone /></span>
                            <span>+916392419916</span>
                        </div>
                        <div className="contact-item02">
                            <span className="contact-icon02"><FaEnvelope /></span>
                            <span>info@uniurbanestate.com</span>
                        </div>
                    </div>
                    <div className="newsletter02">
                        <h5>Subscribe to Newsletter</h5>
                        <div className="newsletter-form02">
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                className="newsletter-input02" 
                            />
                            <button className="newsletter-btn02">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom02">
                <p>&copy; {new Date().getFullYear()} UniUrbanEstate. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer02;