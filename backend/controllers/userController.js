const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middleware/catchAsync");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a User
exports.registerUser = catchAsync(async (req, res, next) => {
  let profileUrl = "/Profile.png";
  let profilePublicId = `ecommerce/${Math.floor(Math.random() * 1000)}`;

  if (req.body.ecommerceImg && req.body.ecommerceImg !== "undefined") {
    try {
      const myCloud = await cloudinary.v2.uploader.upload(
        req.body.ecommerceImg,
        {
          folder: "ecommerce",
          width: 150,
          crop: "scale",
        }
      );
      profilePublicId = myCloud.public_id;
      profileUrl = myCloud.secure_url;
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler("Could not upload profile. Try again", 400));
    }
  }

  const { name, email, password, lastname, phonenumber, birthday, postalCode } =
    req.body;

  const user = await User.create({
    name,
    email,
    password,
    lastname,
    phonenumber,
    birthday,
    postalCode,
    ecommerceImg: {
      public_id: profilePublicId,
      url: profileUrl,
    },
  });

  const token = await user.getJWTToken();
  sendToken(user, 201, res);
});

// Get All User (Admin)
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    length: users.length,
    success: true,
    users,
  });
});

// Get  User (Admin)
exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id ${req.body.params}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Get User Request (Login User)
exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//Login User
exports.loginUser = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;

  //   1) check if email and password exist
  if (!email || !password) {
    return next(new ErrorHandler("Please Provide email and password", 401));
  }
  // check if user exist and pass is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new ErrorHandler("Incorrect email or password", 401));
  }
  const token = await user.getJWTToken();
  sendToken(user, 200, res);
});

//Logout User
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//Forgot Password

exports.forgotPassord = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  //Get ResetPassword Token

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // 3) Send it to the user's
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/account/reset/${resetToken}`;

  const message = `Your Password reset token is :- \n\n ${resetURL} \n\n If you have not requested this email then, please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password

exports.resetPassord = catchAsync(async (req, res, next) => {
  //Creating token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token is Invalid has be expired", 400)
    );
  }
  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not Password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

// Update User password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id).select("+password");
  if (
    !user ||
    !(await user.correctPassword(req.body.oldPassword, user.password))
  ) {
    return next(new ErrorHandler("Incorrect Old password", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  let newUserData = {
    name: req.body.name,
    email: req.body.email,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    birthday: req.body.birthday,
    postalCode: req.body.postalCode,
  };

  if (req.body.ecommerceImg && req.body.ecommerceImg !== "undefined") {
    const user = await User.findById(req.user.id);
    const imageId = user.ecommerceImg.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.ecommerceImg, {
      folder: "ecommerce",
      width: 200,
      height: 300,
      crop: "scale",
    });

    newUserData.ecommerceImg = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    runValidators: true,
    new: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Update User Role --Admin
exports.updateUserRole = catchAsync(async (req, res, next) => {
  let newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  let user = User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400)
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    runValidators: true,
    new: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User  --Admin
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with ID: ${req.params.id}`)
    );
  }

  const imageId = user.ecommerceImg.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted Successfully",
  });
});
