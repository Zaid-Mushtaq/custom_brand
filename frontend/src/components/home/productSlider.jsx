import React, { useState } from "react";
import "../../sass/pages/home/homeSlider.scss";
import { Carousel } from "react-bootstrap";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import dress1 from "../../assets/images/image1.jpg";
import dress2 from "../../assets/images/image2.jpg";
import dress3 from "../../assets/images/image3.jpg";
import dress4 from "../../assets/images/image4.jpg";
import dress5 from "../../assets/images/image5.jpg";
import dress6 from "../../assets/images/image6.jpg";
import dress7 from "../../assets/images/image7.jpg";

const ProductSlider = () => {
  const [index, setIndex] = useState(0);

  const dresses = [
    {
      id: 1,
      image: dress1,
      label: "Elegant Evening Dress",
      content: "Perfect for special occasions and elegant evenings.",
    },
    {
      id: 2,
      image: dress2,
      label: "Casual Summer Dress",
      content: "Stay cool and stylish in this comfortable summer dress.",
    },
    {
      id: 3,
      image: dress3,
      label: "Boho Chic Maxi Dress",
      content: "Express your bohemian spirit with this flowy maxi dress.",
    },
    {
      id: 4,
      image: dress4,
      label: "Vintage Floral Dress",
      content: "Step back in time with this charming vintage floral dress.",
    },
    {
      id: 5,
      image: dress5,
      label: "Formal Cocktail Dress",
      content: "Make a statement at cocktail parties with this formal dress.",
    },
    {
      id: 6,
      image: dress6,
      label: "Athleisure Sporty Dress",
      content: "Combine comfort and style with this sporty athleisure dress.",
    },
    {
      id: 7,
      image: dress7,
      label: "Classic Little Black Dress",
      content: "A timeless piece that every wardrobe needs.",
    },
  ];

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? dresses.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex === dresses.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container-fluid slides position-relative">
      <Carousel
        className="custom-height"
        activeIndex={index}
        onSelect={(selectedIndex) => setIndex(selectedIndex)}
        prevIcon={null}
        nextIcon={null}
      >
        {dresses.map((dress) => (
          <Carousel.Item key={dress.id} className="custom-height">
            <img
              src={dress.image}
              className="img-fluid d-block w-100 custom-height"
              alt={`Dress ${dress.id}`}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>{dress.label}</h5>
              <p>{dress.content}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <button className="custom-carousel-button prev" onClick={handlePrev}>
        <span>
          <MdOutlineArrowBackIosNew className="prev-icon" />
        </span>
      </button>
      <button className="custom-carousel-button next" onClick={handleNext}>
        <span>
          <MdOutlineArrowForwardIos className="next-icon" />
        </span>
      </button>
    </div>
  );
};

export default ProductSlider;
