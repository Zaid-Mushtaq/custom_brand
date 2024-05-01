import React from "react";
import "../../../../sass/components/checkout/summaryTile.scss";

const SummaryTile = ({ tiles, thankYouProps }) => {
  return (
    <div
      className={
        thankYouProps ? "thankyou-tile-container" : "summary-tile-container"
      }
    >
      {tiles &&
        tiles.map((tile) => (
          <div key={tile.stockId} className="order-summary-tile">
            <div className="selected-items-container">
              <div className="selected-items-images">
                <div className="selected-tile-image-container">
                  {tile.image.includes("https") ? (
                    <img
                      src={tile.image}
                      alt={`tile-image-${tile.productId}`}
                    />
                  ) : (
                    <img
                      src={require(`../../../../assets/images/plp-images/${tile.category}/${tile.image}`)}
                      alt={`tile-image-${tile.productId}`}
                    />
                  )}
                </div>
              </div>
              <div className="selected-items-details">
                <div className="product-title-wrapper">
                  <h4 className="product-title-text">{tile.name}</h4>
                </div>
                <div className="product-variants-wrapper">
                  <div>
                    <p className="variants-text">
                      <span>Color:</span>
                      <span>{tile.selectedColor}</span>
                    </p>
                    <p className="variants-text">
                      <span>Size:</span>
                      <span>{tile.selectedSize}</span>
                    </p>
                    <p className="variants-text">
                      <span>Price:</span>
                      <span>
                        {"€"}
                        {tile.price.toFixed(2)}
                      </span>
                    </p>
                    {!thankYouProps ? (
                      <p className="variants-text">
                        <span>Qty:</span>
                        <span>{tile.quantity}</span>
                      </p>
                    ) : null}
                    <div className="variants-text-bold">
                      <p className="item-total-text">Item Total:</p>
                      <p className="currency-price">
                        <span>{"€"}</span>
                        <span>{(tile.price * tile.quantity).toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SummaryTile;
