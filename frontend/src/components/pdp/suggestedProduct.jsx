import React from "react";
import "../../sass/components/pdp/suggested-product.scss";
import ProductTile from "../plp/product-tile";

const SuggestedProduct = ({ products }) => {
  return (
    <div className="container suggested-products">
      <div className="row ">
        <div className="suggested-products-heading-container">
          <h3 className="suggested-product-text">Suggested Products</h3>
        </div>
        {products && products.length > 0 ? (
          <ProductTile productsData={products} />
        ) : (
          <p>No suggested products available.</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedProduct;

