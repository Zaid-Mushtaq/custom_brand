import React, { useEffect } from "react";
import "../../sass/components/productTile/colorBox.scss";

const SelectedColor = ({ product, handleSelectionChange, selectedColor }) => {
  const uniqueColors = [...new Set(product.stock.map((item) => item.color))];

  useEffect(() => {
    // Generate dynamic color classes
    uniqueColors.forEach((color) => {
      const className = color.toLowerCase().replace(/\s+/g, "-");
      const style = `.${className} { background-color: ${color}; }`;
      const styleElement = document.createElement("style");
      styleElement.innerHTML = style;
      document.head.appendChild(styleElement);
    });
  }, [uniqueColors]);

  return (
    <div className="color-options">
      {Array.isArray(product.stock) &&
        uniqueColors.map((color, index) => (
          <div
            key={index}
            className={`color-box ${
              color === selectedColor[product._id] ? "selected" : ""
            } ${color.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() =>
              handleSelectionChange(product._id, "colors", color, product)
            }
          ></div>
        ))}
    </div>
  );
};

export default SelectedColor;
