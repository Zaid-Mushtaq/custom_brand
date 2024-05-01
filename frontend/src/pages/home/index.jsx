import React, { Fragment, useEffect, useState } from "react";
import InfoBar from "../../components/home/infoBar";
import ProductSlider from "../../components/home/productSlider";
import HomePromotions from "../../components/home/homePromotions";
import AllProductSlider from "../../components/home/allProductSlider";
import "../../sass/pages/home/home.scss";
import { useIntl } from "react-intl";
import ProductTile from "../../components/plp/product-tile";
import { getHomeProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../utils/loader";
import { useAlert } from "react-alert";

const Home = () => {
  const intl = useIntl();
  const alert = useAlert();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.homeProducts
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getHomeProduct());
  }, [dispatch, error]);

  useEffect(() => {
    if (products && products.length > 0) {
      const men = products
        .filter((product) => product.category === "men")
        .splice(0, 4);

      const women = products
        .filter((product) => product.category === "women")
        .splice(0, 4);

      const kids = products
        .filter((product) => product.category === "kids")
        .splice(0, 4);

      setFilteredProducts([...men, ...women, ...kids]);
    }
  }, [products]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid home-page">
          <InfoBar />
          <ProductSlider />
          <div className="container mb-5">
            <div className="row">
              <div className="home-product-title-container">
                <h2 className="home-product-title">
                  {intl.formatMessage({ id: "welcome" })}
                </h2>
                <p className="home-product-description">
                  {intl.formatMessage({ id: "description" })}
                </p>
              </div>
            </div>
            {products && <ProductTile productsData={filteredProducts} />}
          </div>
          <HomePromotions />

          {products && <AllProductSlider products={products} />}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
