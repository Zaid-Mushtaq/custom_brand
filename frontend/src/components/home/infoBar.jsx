import React from "react";
import "../../sass/pages/home/infoBar.scss";
const InfoBar = () => {
  return (
    <>
      <div className="container-fluid py-md-4  py-2 p-lg-3 font-medium text-uppercase custom-uua d-lg-block d-none ">
        <div className=" container  ">
          <div className="row d-flex p-2 justify-content-center align-items-center ">
            <div className="col">Pay Easily Afterward with Clarna</div>
            <div className="col">Delivered in 7 days in Netherlands</div>
            <div className="col">Cheap Shipping Across Europe</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBar;
