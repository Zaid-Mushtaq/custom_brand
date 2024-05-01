import React from "react";
import '../../sass/components/pdp/relatedProduct.scss'
import AllProductSlider from "../home/allProductSlider";


const RelatedProducts = ({ products }) => {


    return (
        <div className="related-products">
            <div className="related-products-heading-container">
                <h3 className="related-product-text">Related Products</h3>
            </div>
            <AllProductSlider products={products} />
        </div>
    );
}
export default RelatedProducts;