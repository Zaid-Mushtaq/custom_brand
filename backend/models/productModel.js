const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 2.5,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    lowercase: true,
    required: [true, "Please Enter Product Category"],
    enum: ["men", "women", "kids"],
  },
  subCategory: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "Please Enter Product Sub-Category"],
  },
  stock: [
    {
      size: {
        type: String,
        lowercase: true,
        enum: ["xs", "sm", "md", "lg", "xl", "xxl"],
      },
      color: {
        type: String,
        lowercase: true,
        required: [true, "Please Enter Color"],
      },
      quantity: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
      },
    },
  ],
  currency: {
    type: String,
    default: "ANG",
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  tag: {
    type: String,
    trim: true,
    required: [true, "Please enter Tag"],
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.virtual("totalStock").get(function () {
  return this.stock.reduce((total, variant) => total + variant.quantity, 0);
});

productSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);
