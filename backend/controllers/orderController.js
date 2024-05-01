const Order = require("../models/orderModel");
const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");
const sendEmail = require("../utils/sendEmail");
const path = require("path");
//Crate new Order
exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    billingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    totalQuantity,
    orderStatus = "",
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    billingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    totalQuantity,
    paidAt: Date.now(),
    user: req.user._id,
  });

  const orderedID = order.getUserId();
  const resetURL = `${req.protocol}://${req.get("host")}/order/${orderedID}`;
  let customPath = path.join(
    __dirname,
    "/../../frontend/src/assets/images/plp-images/"
  );
  const productsList =
    orderItems &&
    orderItems.map((item) => {
      // Check if the image URL contains "https://"
      const isExternalImage = item.image && item.image.includes("https://");

      // Construct the image URL based on whether it's external or local
      const imageUrl = isExternalImage
        ? item.image // Use the external image URL directly
        : customPath + `${item.category}/${item.image}`;

      console.log("Image URL:", imageUrl);

      return `
      <div style="margin-bottom: 10px;">
        <strong>Product:</strong> ${item.name} <br />
        <img
          src="${imageUrl}"
          alt="${item.name}"
          style="max-width: 100px; max-height: 100px;"
        /> <br />
        <strong>Price:</strong> ${item.price} <br />
        <strong>Quantity:</strong> ${item.quantity} <br />
        <strong>Ordered Size:</strong> ${item.selectedSize} <br />
        <strong>Ordered Color:</strong> ${item.selectedColor} <br />
      </div>
    `;
    });

  const message = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .product-info {
          margin-bottom: 20px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Thank you for your order!</h2>
        <p><strong>Order ID:</strong> ${orderedID}</p>
        <p><strong>Your Order No:</strong> ${order.orderNo && order.orderNo}</p>
        <div class="product-info">
          <h3>Products:</h3>
          ${productsList.join("")}
        </div>
        <p><strong>Total Items:</strong> ${totalQuantity}</p>
        <p><strong>Ordered Status:</strong> ${orderStatus}</p>
        <p><strong>Items Price:</strong> ${itemsPrice}</p>
        <p><strong>Tax:</strong> ${taxPrice}</p>
        <p><strong>Shipping Price:</strong> ${shippingPrice}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
        <p>You can view your order status and details <a href="${resetURL}">here</a>.</p>
      </div>
    </body>
    </html>
  `;

  try {
    await sendEmail({
      email: req.user.email,
      subject: `Product Order Email`,
      message,
    });

    res.status(201).json({
      success: true,
      order,
      message: `Email sent to ${req.user.email} successfully`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get Single Order
exports.getSingleOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: "true",
    order,
  });
});

// get logged in user Order
exports.myOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: "true",
    orders,
  });
});

// get all Orders --Admin
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: "true",
    totalAmount,
    orders,
  });
});

// Update Order Srtatus --Admin
exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus && order.orderStatus === "Delivered") {
    return next("You have already delivered this product", 400);
  }

  if (req.body.status && req.body.status === "Shipped") {
    order.orderItems.forEach(
      async (order) =>
        await updateStock(order.productId, order.quantity, order.stockId)
    );
  }

  if (req.body.status && req.body.status) {
    order.orderStatus = req.body.status;
  }

  if (req.body.status && req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity, stockId) {
  const product = await Product.findById(id);

  const stockItem = product.stock.find((stock) => {
    return stock._id.toString() === stockId.toString();
  });

  if (stockItem) {
    if (stockItem.quantity > 0 && stockItem.quantity >= quantity) {
      stockItem.quantity -= quantity;
      await product.save({ validateBeforeSave: false });
    } else {
      throw new Error("Insufficient stock for this product variant");
    }
  } else {
    throw new Error("Stock item not found");
  }
}

// Delete Order --Admin
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();
  res.status(200).json({
    success: "true",
  });
});
