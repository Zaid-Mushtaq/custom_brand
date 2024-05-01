import React, { useState, useEffect, useLayoutEffect } from "react";
import SummaryDetail from "./sub-components/summaryDetail";
import "../../../sass/components/checkout/orderSummary.scss";
import Card from "../../reuseable/card";
import Accordion from "../../reuseable/Accordion";
import CustomParagraph from "./sub-components/paragrah";
import { IoIosArrowDown } from "react-icons/io";

const CheckoutOrderSummary = ({
  subtotal,
  shippingCharges,
  totalPrice,
  tax,
  cartItems,
}) => {
  const [getWidth] = useState(window.innerWidth);
  const [isAccordionVisible, setIsAccordionVisible] = useState(getWidth < 769);
  const [activeAccordionKey, setActiveAccordionKey] = useState(null);
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  useLayoutEffect(() => {
    if (isOverlayActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOverlayActive]);

  useEffect(() => {
    const handleResize = () => {
      const newIsAccordionVisible = window.innerWidth < 769;
      setIsAccordionVisible(newIsAccordionVisible);

      if (!newIsAccordionVisible) {
        setActiveAccordionKey(null);
        setIsOverlayActive(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isAccordionVisible]);

  const handleAccordionClick = (key) => {
    setActiveAccordionKey((prevKey) => (prevKey === key ? null : key));
    setIsOverlayActive(!isOverlayActive);
  };

  const closeOverlay = () => {
    setActiveAccordionKey(null);
    setIsOverlayActive(false);
  };

  return (
    <>
      <div className="__order_summary">
        <div className="order-summary-container">
          {isAccordionVisible ? (
            <Accordion
              activeKey={activeAccordionKey}
              onToggle={handleAccordionClick}
              dynamicClass={"custom-accordion"}
            >
              <Card eventKey="0">
                {/* <div className="order-summary-header">Order Summary</div> */}
                <div className="accordion-header">
                  <CustomParagraph
                    text={`Your Total (${cartItems} items)`}
                    customClass="_total-items-text"
                  />
                  <div className="_total-items-value-wrapper">
                    <CustomParagraph
                      text={` €${subtotal}`}
                      customClass="_total-items-text"
                    />
                    <IoIosArrowDown
                      className={` arrow-icon ${activeAccordionKey === "0" ? "rotate" : ""
                        }`}
                    />
                  </div>
                </div>
                <SummaryDetail
                  subtotal={subtotal}
                  shippingCharges={shippingCharges}
                  totalPrice={totalPrice}
                  tax={tax}
                />
              </Card>
            </Accordion>
          ) : (
            <SummaryDetail
              subtotal={subtotal}
              shippingCharges={shippingCharges}
              totalPrice={totalPrice}
              tax={tax}
            />
          )}
        </div>
      </div>
      {isOverlayActive && (
        <div className="overlay" onClick={closeOverlay}></div>
      )}
    </>
  );
};

export default CheckoutOrderSummary;
