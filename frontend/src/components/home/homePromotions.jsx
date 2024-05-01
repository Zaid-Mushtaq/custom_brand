import React from "react";
import "../../sass/components/homePromotion.scss";
import imagePromo from "../../assets/images/home_promotion.jpg";
const HomePromotions = () => {
  return (
    <>
      <div className="container-fluid home-promotion-container ">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-5  custom-promo-image">
              <div className="image-promo-container">
                <img src={imagePromo} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-7 right-content-propotion">
              <h2>WE ORIENT OUR CHOICES TO THE FUTURE</h2>
              <p>
                At the heart of our decisions lies a commitment to people, our
                communities, and the environment. We invest with unwavering
                responsibility and transparency, aiming to create a positive
                impact on society. Our vision of sustainability permeates every
                aspect, from the meticulous selection and development of
                products to the engagement of all our resources. <br /> <br />
                Our dedication to sustainability is evident in projects that go
                beyond conventional boundaries. We take pride in our "EcoAmico"
                label, signifying products that meet our stringent
                sustainability criteria. .
              </p>
              <a href="#" className="btn btn-primary btn-promo">
                Find out more
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePromotions;
