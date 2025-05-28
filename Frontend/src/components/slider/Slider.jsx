import React, { useState } from "react";
import "./slider.scss";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false); // New state for fullscreen modal

  // Navigate to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Handle cases where no images are provided
  if (!images || images.length === 0) {
    return <div className="slider">No images available</div>;
  }

  // If there's only one image, disable navigation buttons
  if (images.length === 1) {
    return (
      <div className="slider">
        <img
          src={images[0]}
          alt="Single slide"
          onClick={() => setModalOpen(true)} // Open modal on image click
        />
      </div>
    );
  }

  // Open the modal with the clicked image
  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Fullscreen Modal
  const Modal = () => (
    <div className="fullscreen-modal">
      <div className="modal-content">
        <button className="close" onClick={closeModal}>
          &#10005;
        </button>
        <img src={images[currentIndex]} alt={`Fullscreen Slide ${currentIndex + 1}`} />
        <button className="prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        onClick={() => openModal(currentIndex)} // Open modal on image click
      />
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>

      {/* Render modal if it's open */}
      {modalOpen && <Modal />}
    </div>
  );
};

export default Slider;
