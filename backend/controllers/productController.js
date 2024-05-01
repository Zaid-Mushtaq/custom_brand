const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeature");
const catchAsync = require("../middleware/catchAsync");
const cloudinary = require("cloudinary");

// Create Product --Admin
exports.createProduct = catchAsync(async (req, res, next) => {
  let images = [];
  const stock = JSON.parse(req.body.stock);

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;

  const product = await Product.create({
    ...req.body,
    stock: stock,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  let { category = "", keyword = "", page = 1 } = req.query;
  const resultPerPage = 12;
  const limit = resultPerPage * page;

  const checkCategory = category ? { category } : {};
  let checkKeyword = {};

  let productsCount;
  if (Object.keys(category).length < 1) {
    checkKeyword = keyword ? keyword : {};

    Object.keys(checkKeyword).length >= 1 &&
      (productsCount = await Product.countDocuments({
        name: { $regex: checkKeyword, $options: "i" },
      }));
  } else {
    productsCount = await Product.countDocuments(checkCategory);
  }

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .category()
    .sort()
    .filter();

  let products = await apiFeature.query;

  let filterredProductsCount = products.length;

  apiFeature.pagination(limit);

  products = await apiFeature.query;

  res.status(200).json({
    length: products.length,
    success: true,
    products,
    productsCount,
    resultPerPage,
    filterredProductsCount,
  });
});

//Get Home Page Products
exports.getHomeProducts = catchAsync(async (req, res, next) => {
  productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .category()
    .sort()
    .filter();
  let products = await apiFeature.query;
  res.status(200).json({
    length: products.length,
    success: true,
    products,
    productsCount,
  });
});

//Admin Get All Products
exports.getAdminProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    length: products.length,
    success: true,
    products,
  });
});

// Suggestions
exports.getProductSuggestions = catchAsync(async (req, res, next) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({
      success: false,
      message: "Keyword is required for suggestions.",
    });
  }

  const suggestions = new ApiFeatures(Product.find(), req.query).suggestions();
  const suggestedProducts = await suggestions;

  res.status(200).json({
    success: true,
    suggestions: suggestedProducts,
  });
});

//Get Product Details
exports.getProductDetails = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product --Admin
exports.updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const { stock, ...updateData } = req.body;
  // Images Start here

  let images = [];
  // const stock = JSON.parse(req.body.stock);

  if (typeof req.body.images === "string") {
    console.log(req.body.images);
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images from Cloudinary

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    updateData.images = imagesLink;
  }

  const stockData = JSON.parse(req.body.stock);
  updateData.stock = stockData;

  product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
exports.deleteProducts = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Deleting Images from Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  product = await Product.findByIdAndDelete(req.params.id);
  // await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get All Reviews of Products
exports.getProductReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review
exports.deleteReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  let ratings = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  if (reviews.length > 0) {
    ratings = avg / reviews.length;
  } else {
    ratings = 3;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
