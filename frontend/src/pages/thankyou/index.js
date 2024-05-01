import React, { Fragment } from "react";
import "../../sass/pages/thankyou/thankyou.scss";
import ThankYouMessage from "../../components/thankyou/thankYouMessage";
import ThankYouSummary from "../../components/thankyou/thankYouSummary";
import ThankYouDescription from "../../components/thankyou/thankYouDescription";
import { useSelector } from "react-redux";
import Loader from "../../utils/loader";
const ThankYou = () => {
  const { loading, order } = useSelector((state) => state.newOrder);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid thankyou-page">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {order ? (
                  <div className="thankyou-wrapper">
                    <ThankYouMessage orderNo={order && order.order.orderNo} />
                    <ThankYouSummary order={order && order} />
                    <ThankYouDescription />
                  </div>
                ) : (
                  <div className="no-order-generate">
                    <h1>No Order Generated</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ThankYou;
