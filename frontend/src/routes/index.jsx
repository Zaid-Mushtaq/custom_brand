import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Home from "../pages/home";
import CartPage from "../pages/cart/cartPage";
import ProductList from "../pages/plp";
import ProductDetail from "../pages/pdp";
import { LocalsProvider } from "../utils/locals";
import { ProductProvider } from "../utils/ProductContext";
import { ShoppingCartProvider } from "../components/cart/shopingCartProvider";
import AdminPanel from "../admin-pannel";
import Dashboard from "../admin-dashboard";
import Checkout from "../pages/checkout";
import Account from "../pages/account/account";
import Login from "../pages/account/login";
import UserProfileData from "../components/account/userProfile/userProfileData";
import UserPassword from "../components/account/userProfile/userPassword";
import { useSelector } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/userAction";
import CheckoutHeader from "../components/checkout/header/checkoutHeader";
import UserAddress from "../components/account/userProfile/userAddress";
import Payment from "../components/account/userProfile/payment";
import ResetPassword from "../components/account/accountProfile/reset-password";
import CheckoutLogin from "../pages/checkout/checkout-login";
import ThankYou from "../pages/thankyou";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "../pages/orders";
import OrderDetails from "../pages/orderpdp";
import ProtectedRoute from "./protectedRoute";
import AllProductList from "../admin-dashboard/productList/allProductList";
import NewProduct from "../admin-dashboard/createProduct/newProduct";
import UpdateProduct from "../admin-dashboard/updateProduct/updateProduct";
import OrderList from "../admin-dashboard/orderList/orderList";
import UsersList from "../admin-dashboard/usersList/usersList";
import ProcessOrder from "../admin-dashboard/processOrder/processOrder";
import UpdateUser from "../admin-dashboard/updateUser/updateUser";
import ProductReviews from "../admin-dashboard/productReviews/productReviews";
import NotFound from "../pages/notFound";
import ScrollToTopOnNavigation from "../utils/scrollToTopOnNavigation";

const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const CheckoutLayout = ({ children }) => (
  <>
    <CheckoutHeader />
    {children}
    <Footer />
  </>
);

const ProjectRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeAPiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeAPiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getStripeApiKey();
    }
  }, [isAuthenticated]);

  return (
    <Router scrollBehavior="auto">
      <ScrollToTopOnNavigation />
      <LocalsProvider>
        <ShoppingCartProvider>
          <ProductProvider>
            <Routes>
              <Route
                path="/checkout"
                element={
                  stripeApiKey &&
                  isAuthenticated === true && (
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <CheckoutLayout>
                        {/* <Checkout /> */}
                        <ProtectedRoute element={Checkout} />
                      </CheckoutLayout>
                    </Elements>
                  )
                }
              />

              <Route
                path="/"
                element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                }
              />

              <Route
                path="/cart"
                element={
                  <MainLayout>
                    <CartPage />
                  </MainLayout>
                }
              />

              <Route
                path="/product-list"
                element={
                  <MainLayout>
                    <ProductList />
                  </MainLayout>
                }
              />

              <Route
                path="/product-list/:category"
                element={
                  <MainLayout>
                    <ProductList />
                  </MainLayout>
                }
              />

              <Route
                path="/product-list/:category/:subCategory"
                element={
                  <MainLayout>
                    <ProductList />
                  </MainLayout>
                }
              />

              <Route
                path="/products/search/:keyword"
                element={
                  <MainLayout>
                    <ProductList />
                  </MainLayout>
                }
              />

              <Route
                path="/product-detail/:id"
                element={
                  <MainLayout>
                    <ProductDetail />
                  </MainLayout>
                }
              />

              <Route
                path="/checkout-login"
                element={
                  <CheckoutLayout>
                    <CheckoutLogin />
                  </CheckoutLayout>
                }
              />

              <Route
                path="/account"
                element={
                  <MainLayout>
                    <ProtectedRoute element={Account} />
                  </MainLayout>
                }
              />

              <Route
                path="/login"
                element={
                  <MainLayout>
                    <Login />
                  </MainLayout>
                }
              />

              <Route
                path="/account/profile"
                element={
                  <MainLayout>
                    <ProtectedRoute element={UserProfileData} />
                  </MainLayout>
                }
              />

              <Route
                path="/account/password"
                element={
                  <MainLayout>
                    <ProtectedRoute element={UserPassword} />
                  </MainLayout>
                }
              />

              <Route
                path="/account/add-address"
                element={
                  <MainLayout>
                    <UserAddress />
                  </MainLayout>
                }
              />

              <Route
                path="/account/add-payment"
                element={
                  <MainLayout>
                    <Payment />
                  </MainLayout>
                }
              />

              <Route
                path="/account/reset/:token"
                element={
                  <CheckoutLayout>
                    <ResetPassword />
                  </CheckoutLayout>
                }
              />

              <Route
                path="/admin-pannel"
                element={<ProtectedRoute isAdmin={true} element={AdminPanel} />}
              />

              <Route
                path="/admin/dashboard"
                element={<ProtectedRoute isAdmin={true} element={Dashboard} />}
              />

              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute isAdmin={true} element={AllProductList} />
                }
              />

              <Route
                path="/admin/product"
                element={<ProtectedRoute isAdmin={true} element={NewProduct} />}
              />

              <Route
                path="/admin/product/:id"
                element={
                  <ProtectedRoute isAdmin={true} element={UpdateProduct} />
                }
              />

              <Route
                path="/admin/orders"
                element={<ProtectedRoute isAdmin={true} element={OrderList} />}
              />

              <Route
                path="/admin/order/:id"
                element={
                  <ProtectedRoute isAdmin={true} element={ProcessOrder} />
                }
              />

              <Route
                path="/admin/users"
                element={<ProtectedRoute isAdmin={true} element={UsersList} />}
              />

              <Route
                path="/admin/user/:id"
                element={<ProtectedRoute isAdmin={true} element={UpdateUser} />}
              />

              <Route
                path="/admin/reviews"
                element={
                  <ProtectedRoute isAdmin={true} element={ProductReviews} />
                }
              />

              <Route
                path="/thankyou"
                element={
                  <MainLayout>
                    <ProtectedRoute element={ThankYou} />
                  </MainLayout>
                }
              />

              <Route
                path="/orders"
                element={
                  <MainLayout>
                    <ProtectedRoute element={Orders} />
                  </MainLayout>
                }
              />

              <Route
                path="/order/:id"
                element={
                  <MainLayout>
                    <ProtectedRoute element={OrderDetails} />
                  </MainLayout>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProductProvider>
        </ShoppingCartProvider>
      </LocalsProvider>
    </Router>
  );
};

export default ProjectRoutes;
