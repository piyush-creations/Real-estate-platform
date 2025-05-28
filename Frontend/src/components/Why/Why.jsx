import React from "react";
import { FaHome, FaHandshake, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa";
import "./Why.css"; // Import the CSS file

const features = [
  {
    icon: <FaHome className="feature-icon" />,
    title: "Wide Range of Properties",
    description: "Find properties that suit your budget and lifestyle across various locations.",
  },
  {
    icon: <FaHandshake className="feature-icon" />,
    title: "Trusted by Thousands",
    description: "Your go-to platform for straightforward property deals.",
  },
  {
    icon: <FaMoneyBillWave className="feature-icon" />,
    title: "Affordable Prices",
    description: "We offer the best market deals with transparent pricing and no hidden costs.",
  },
  {
    icon: <FaShieldAlt className="feature-icon" />,
    title: "Secure Transactions",
    description: "Your transactions are safe with our verified and legal property deals.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            {feature.icon}
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
