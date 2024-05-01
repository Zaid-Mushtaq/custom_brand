// ProductSlider.js
import React, { useState } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../../sass/components/productSlider/productSlider.scss";

const ProductSlider = ({
  product,
  handleSliderImageLoad,
  handleIndex,
  loadingStates,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % product.images.length;
    setCurrentIndex(nextIndex);
    handleIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      (currentIndex - 1 + product.images.length) % product.images.length;
    setCurrentIndex(prevIndex);
    handleIndex(prevIndex);
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
    handleIndex(index);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div style={{ bottom: "10px" }}>
        <ul className="slick-dots">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className={`indicator ${i === currentIndex ? "active" : ""}`} />
    ),
  };

  return (
    <div className="product-slider-container">
      <Slider {...sliderSettings}>
        {product.images.map((image, imgIndex) => (
          <div key={imgIndex} className="slider-item">
            <Link to={`/product-detail/${product._id}`}>
              {image.url.includes("https") ? (
                <img
                  src={image.url}
                  alt={`image-${image.public_id}-${imgIndex}`}
                  onLoad={() => handleSliderImageLoad(image._id, imgIndex)}
                />
              ) : (
                <img
                  src={require(`../../assets/images/plp-images/${product.category}/${image.url}`)}
                  alt={`image-${image.public_id}-${imgIndex}`}
                  onLoad={() => handleSliderImageLoad(image._id, imgIndex)}
                />
              )}
            </Link>
            {loadingStates[product._id]?.sliderImages &&
              loadingStates[product._id]?.sliderImages[imgIndex] && (
                <div className="loader"></div>
              )}
          </div>
        ))}
      </Slider>

      <div className="carousel-indicators">
        {product.images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
