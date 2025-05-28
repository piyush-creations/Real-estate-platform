import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './About.css';
import '../../Assets/images/HOUSE.jpg'

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const handleScroll = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInView && !isVisible) {
                setIsVisible(true);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial visibility
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVisible]);

    const stats = [
        { number: '500+', label: 'Properties Managed' },
        { number: '98%', label: 'Client Satisfaction' },
        { number: '15+', label: 'Years Experience' },
        { number: '24/7', label: 'Support Available' }
    ];

    const services = [
        'Comprehensive Property Management',
        'Tenant Screening & Placement',
        'Rent Collection & Financial Reporting',
        'Property Maintenance & Repairs',
        'Legal Compliance & Documentation',
        'Market Analysis & Investment Consulting'
    ];

    return (
        <section className="about-section" id="about" ref={ref}>
            <div className="about-container">
                {/* Hero Section */}
                <div className="about-hero">
                    <motion.div 
                        className="about-content"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="section-tag">WHO WE ARE</div>
                        <h1 className="about-title">
                            Your Trusted Property Management Partner
                        </h1>
                        <p className="about-description">
                            At <strong>UniUrban</strong>, we specialize in providing comprehensive property 
                            management solutions tailored to meet the unique needs of property owners and investors. 
                            Our goal is to maximize your returns while delivering a seamless, stress-free experience 
                            for both you and your tenants.
                        </p>
                        <p className="about-description">
                            With a deep understanding of the real estate market and a commitment to excellence, 
                            we take care of every aspect of property management – from tenant placement and rent 
                            collection to property maintenance and legal compliance.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        className="about-image-container"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <img 
                            src="../../Assets/images/HOUSE.jpg"
                        />
                        <div className="image-overlay">
                            <div className="overlay-content">
                                <h3>Excellence in Property Management</h3>
                                <p>Maximizing your investment potential</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div 
                    className="stats-section"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Services Section */}
                <motion.div 
                    className="services-section"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h2 className="services-title">Our Core Services</h2>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <motion.div 
                                key={index} 
                                className="service-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                            >
                                <div className="service-icon">✓</div>
                                <span>{service}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Mission Statement */}
                <motion.div 
                    className="mission-section"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.0 }}
                >
                    <div className="mission-content">
                        <h2>Our Mission</h2>
                        <p>
                            We take the stress out of property ownership so you can enjoy peace of mind. 
                            Our dedicated team of experts ensures that your investment is well-maintained, 
                            profitable, and in full compliance with industry regulations.
                        </p>
                        <button className="cta-button">
                            Get Started Today
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;