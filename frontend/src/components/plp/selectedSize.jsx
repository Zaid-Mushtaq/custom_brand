// SelectedSize.jsx
import React, { useEffect } from "react";

const SelectedSize = ({
  product,
  selectedSizes,
  handleSizeChange,
  selectedColor,
  selectedProductID,
}) => {
  const productStock = product?.stock || [];
  const uniqueSizes = [...new Set(productStock.map((item) => item.size))];

  useEffect(() => {
    handleSizeChange(product._id, null);
  }, [selectedColor[product._id]]);

  if (selectedProductID && product._id === selectedProductID) {
    return (
      <div className="size-options">
        {uniqueSizes.length > 0 ? (
          <>
            {uniqueSizes.map((size) => {
              const isSizeAvailable = productStock.some(
                (item) =>
                  item.size === size &&
                  item.color === selectedColor[product._id]
              );

              return (
                <div
                  key={size}
                  className={`size-box ${
                    size === selectedSizes[product._id] ? "selected" : ""
                  } ${isSizeAvailable ? "" : "disabled"}`}
                  onClick={() =>
                    isSizeAvailable && handleSizeChange(product._id, size)
                  }
                  style={{
                    pointerEvents: isSizeAvailable ? "auto" : "none",
                  }}
                >
                  {isSizeAvailable ? (
                    size
                  ) : (
                    <>
                      <span className="disabled-line" />
                      {size}
                    </>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <span className="normal-span">No sizes available</span>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default SelectedSize;
