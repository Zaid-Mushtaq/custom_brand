const catchAsyncError = require("../middleware/catchAsync");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const payment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "Digits Commerce",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: payment.client_secret,
  });
});

exports.sendStripeApikey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
