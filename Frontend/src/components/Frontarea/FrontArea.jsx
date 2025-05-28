import React from "react";
import "./FrontArea.css";
import { Link } from "react-router-dom";
import Converter from '../../Assets/images/Converter.png';

const FrontArea = () => {
  return (
    <section className="area-section">
      <div className="area-container">
        <div className="area-image">
          <img src={Converter} alt="About Us" className="convert" />
        </div>
        <div className="area-content">
          <h1>Convert Property Area Instantly</h1>
          <p>
            Need to switch between square feet, gaj, bigha, or acres? Use our smart area converter to make informed real estate decisions with confidence.
          </p>
          <Link to="/area-converter" className="area-button">
            Start Converting →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FrontArea;
