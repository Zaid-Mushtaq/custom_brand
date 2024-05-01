const express = require("express");
const productController = require("../controllers/productController");
const { isAuthenticatedUser, userRole } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(productController.getAllProducts);
router.route("/home/products").get(productController.getHomeProducts);

router
  .route("/products/suggestions")
  .get(productController.getProductSuggestions);

router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    userRole("admin"),
    productController.createProduct
  );

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, userRole("admin"), productController.updateProduct)
  .delete(
    isAuthenticatedUser,
    userRole("admin"),
    productController.deleteProducts
  );

router
  .route("/admin/products")
  .get(
    isAuthenticatedUser,
    userRole("admin"),
    productController.getAdminProducts
  );

router.route("/product/:id").get(productController.getProductDetails);

router
  .route("/review")
  .put(isAuthenticatedUser, productController.createProductReview);

router
  .route("/reviews")
  .get(productController.getProductReviews)
  .delete(isAuthenticatedUser, productController.deleteReviews);

module.exports = router;
