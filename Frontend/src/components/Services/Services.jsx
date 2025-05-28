import React from 'react';
import './Services.css';
import services1 from '../../Assets/images/services1.jpg';
import services2 from '../../Assets/images/services2.jpg';
import services3 from '../../Assets/images/services3.jpg';
import services4 from '../../Assets/images/services4.jpg';
import services5 from '../../Assets/images/services5.jpg';
import { Navigate } from 'react-router-dom';

const Services = () => {
  return (
    <div className="container">
      <h1>Explore our services</h1>
      <div className="services">
        <a href="#comercial1">
          <div className="image-container" >
            <img src={services1} alt="Icon 1" />
          </div>
          <span>Buying a commercial property</span>
        </a>
        <a href="#comercial2">
          <div className="image-container">
            <img src={services2} alt="Icon 2" />
          </div>
          <span>Leasing a commercial property</span>
        </a>
        <a href="#comercial3">
          <div className="image-container">
            <img src={services3} alt="Icon 3" />
          </div>
          <span>Buy Plots/Lands</span>
        </a>
        <a href="#comercial4">
          <div className="image-container">
            <img src={services4} alt="Icon 4" />
          </div>
          <span>Renting a home</span>
        </a>
        <a href="#comercial5">
          <div className="image-container">
            <img src={services5} alt="Icon 5" />
          </div>
          <span>PG and co-living</span>
        </a>
      </div>
    </div>
  );
};

export default Services;
