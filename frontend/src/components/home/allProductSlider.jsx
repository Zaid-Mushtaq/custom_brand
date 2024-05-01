import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../sass/components/allProductSlider.scss";

const AllProductSlider = ({ products }) => {
  const sliderRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    infinite: true,
    slidesToShow:
      windowWidth > 1300
        ? 4
        : windowWidth > 982
        ? 3
        : windowWidth > 767
        ? 2
        : 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    arrows: false,
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="container position-relative product-slider">
      <Slider ref={sliderRef} {...settings} className="slider-container">
        {products.map((product) => (
          <div key={product._id} className="text-center">
            {product.images[0].url.includes("https") ? (
              <img
                src={product.images[0].url}
                alt={`Product ${product.images[0]._id}`}
                className="card-img-top"
              />
            ) : (
              <img
                src={require(`../../assets/images/plp-images/${product.category}/${product.images[0].url}`)}
                alt={`Product ${product.images[0]._id}`}
                className="card-img-top"
              />
            )}

            <div className="product-details">
              <div className="product-name">
                <h5 className="card-title font-bold">{product.name}</h5>
              </div>
              <div className="crousel-description-wrapper">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item font-bold custom-color">
                    <span className="bold-span">Price:</span>
                    <span className="normal-span">€{product.price}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <button
        className="carousel-control-prev left-1"
        type="button"
        onClick={handlePrev}
      >
        <span className="visually-hidden">Previous</span>
        <span className="custom-arrow">&#8249;</span>{" "}
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={handleNext}
      >
        <span className="visually-hidden">Next</span>
        <span className="custom-arrow">&#8250;</span>{" "}
      </button>
    </div>
  );
};

export default AllProductSlider;
