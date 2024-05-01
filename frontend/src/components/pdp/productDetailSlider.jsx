import React, { useState, useEffect } from "react";
import "../../sass/components/pdp/productSlider.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useProduct } from "../../utils/ProductContext";
import { useParams } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

const ProductDetailSlider = ({ selectedProductImage, category }) => {
  console.log("Images", selectedProductImage);
  const [index, setIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { selectedProduct } = useProduct();

  useEffect(() => {
    setIndex(0);
  }, [selectedProduct]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleThumbnailClick = (event, clickedId) => {
    event.preventDefault();
    const clickedIndex = selectedProductImage.findIndex(
      (image) => image._id === clickedId
    );

    if (index !== clickedIndex && clickedIndex !== -1) {
      setIndex(clickedIndex);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="product-slider-main">
      <div id="customCarousel" className="carousel slide">
        <div className="carousel-inner">
          {selectedProductImage.map(({ _id, url }, currentIndex) => (
            <div
              className={`carousel-item ${
                index === currentIndex ? "active" : ""
              }`}
              key={_id}
              id={`slide${_id}`}
            >
              <div className="slider-image-wrapper" onClick={openModal}>
                {url.includes("https") ? (
                  <img
                    src={url}
                    alt={`Slide ${index + 1}`}
                    className="product-image"
                  />
                ) : (
                  <img
                    src={require(`../../assets/images/plp-images/${category}/${url}`)}
                    alt={`Slide ${index + 1}`}
                    className="product-image"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#customCarousel"
          data-bs-slide="prev"
          onClick={() =>
            handleSelect(
              (index - 1 + selectedProductImage.length) %
                selectedProductImage.length
            )
          }
          disabled={index === 0}
        >
          <span className="carousel-prev-icon" aria-hidden="true">
            <IoIosArrowBack />
          </span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#customCarousel"
          data-bs-slide="next"
          onClick={() =>
            handleSelect((index + 1) % selectedProductImage.length)
          }
          disabled={index === selectedProductImage.length - 1}
        >
          <span className="carousel-next-icon" aria-hidden="true">
            <IoIosArrowForward />
          </span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {modalIsOpen && (
        <div className="custom-modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              <IoIosClose />
            </span>
            {selectedProductImage[index].url.includes("https") ? (
              <img
                src={selectedProductImage[index].url}
                alt={`Slide ${index + 1}`}
              />
            ) : (
              <img
                src={require(`../../assets/images/plp-images/${category}/${selectedProductImage[index].url}`)}
                alt={`Slide ${index + 1}`}
              />
            )}
          </div>
        </div>
      )}
      <div className="slider-bottom-image-wrapper">
        <ul>
          {selectedProductImage.map(({ _id, url }, currentIndex) => (
            <li key={_id}>
              <div className="slider-bottom-image-container">
                <a
                  href={`#slide${_id}`}
                  onClick={(event) => handleThumbnailClick(event, _id)}
                >
                  <div
                    className={`slider-bottom-image ${
                      index === currentIndex ? "active" : ""
                    }`}
                  >
                    {url.includes("https") ? (
                      <img src={url} alt="" />
                    ) : (
                      <img
                        src={require(`../../assets/images/plp-images/${category}/${url}`)}
                        alt=""
                      />
                    )}
                  </div>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailSlider;
