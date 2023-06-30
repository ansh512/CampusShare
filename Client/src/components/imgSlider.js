import React, { useState } from 'react';
import styles from '../css/slider.module.css';

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.imageSlider}>
      <img src={images[currentImageIndex]} className={styles.imageSliderImg} alt="Slider" />
      <button  styles={{marginRight:'20px'}} onClick={previousImage}>&#10094;</button><button className={`${styles.imageSliderButton}}`}  onClick={nextImage}>&#10095;</button>
    </div>
  );
};

export default ImageSlider;
