const mongoose = require("mongoose");

// Function to generate unique order numbers in sequence
let lastOrderNumber = 0;

function generateOrderNumber() {
  lastOrderNumber++;
  return `${lastOrderNumber.toString().padStart(10, "0")}`;
}

const orderModel = new mongoose.Schema({
  orderNo: {
    type: String,
    unique: true,
  },
  shippingInfo: {
    address: {
      type: String,
      required: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
    },
    state: {
      type: String,
      required: true,
      lowercase: true,
    },
    country: {
      type: String,
      required: true,
      lowercase: true,
    },
    pinCode: {
      type: String,
      trim: true,
      required: true,
    },

    phoneNo: {
      type: String,
      validate: {
        validator: function (value) {
          // You can customize the phone number validation as needed
          return /^\+\d{1,3}\s\d{6,13}$/.test(value);
        },
        message: "Invalid phone number",
      },
    },
  },

  billingInfo: {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
    },
    state: {
      type: String,
      required: true,
      lowercase: true,
    },
    country: {
      type: String,
      required: true,
      lowercase: true,
    },
    pinCode: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNo: {
      type: String,
      validate: {
        validator: function (value) {
          // You can customize the phone number validation as needed
          return /^\+\d{1,3}\s\d{6,13}$/.test(value);
        },
        message: "Invalid phone number",
      },
    },
  },
  orderItems: [
    {
      name: { type: String, required: true, lowercase: true },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      category: {
        type: String,
        lowercase: true,
        required: [true, "Please Enter Product Category"],
        enum: ["men", "women", "kids"],
      },
      selectedSize: {
        type: String,
        lowercase: true,
        enum: ["xs", "sm", "md", "lg", "xl", "xxl"],
      },
      selectedColor: {
        type: String,
        lowercase: true,
        required: [true, "Please Enter Color"],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      stockId: { type: mongoose.Schema.ObjectId, ref: "Stock", required: true },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    default: 0,
  },
  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  totalQuantity: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to generate order number before saving
orderModel.pre("save", function (next) {
  const self = this;

  // If orderNo is already assigned, proceed
  if (self.orderNo) {
    return next();
  }

  // Function to generate unique order number
  function generateUniqueOrderNumber() {
    self.orderNo = generateOrderNumber();
    self.constructor.findOne({ orderNo: self.orderNo }, function (err, order) {
      if (err) {
        return next(err);
      }
      if (order) {
        // If order number already exists, regenerate it
        return generateUniqueOrderNumber();
      }
      next();
    });
  }

  // Generate unique order number
  generateUniqueOrderNumber();
});

orderModel.methods.getUserId = function () {
  orderId = this._id;
  console.log("Order ID::", orderId);
  return orderId;
};

module.exports = mongoose.model("Order", orderModel);
