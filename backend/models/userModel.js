const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 charachers"],
    trim: "true",
    lowercase: true,
  },
  lastname: {
    type: String,
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 charachers"],
    trim: "true",
    lowercase: true,
  },
  phonenumber: {
    type: String,
    validate: {
      validator: function (value) {
        // You can customize the phone number validation as needed
        return /^\+\d{1,3}\s\d{6,13}$/.test(value);
      },
      message: "Invalid phone number",
    },
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Pease Enter Your Password"],
    minLength: [8, "Password should be greater than 7 characters"],
    select: false,
    validate: {
      validator: function (value) {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
        return passwordRegex.test(value);
      },
      message:
        "Password: 8+ characters, uppercase, lowercase, number, special character required",
    },
  },
  birthday: {
    type: Date,
  },
  postalCode: {
    type: String,
    trim: true,
  },
  ecommerceImg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  next();
});
// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password
userSchema.methods.correctPassword = async function (
  condidatePassword,
  userPassword
) {
  return bcrypt.compare(condidatePassword, userPassword);
};

//Genewrating ResetPassword Token

userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(32).toString("hex");
  //Hashing and adding to user Schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.resetPasswordToken);

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
