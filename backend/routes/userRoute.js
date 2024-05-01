const express = require("express");
const {
  registerUser,
  getAllUsers,
  loginUser,
  logout,
  forgotPassord,
  resetPassord,
  getUserDetails,
  updatePassword,
  updateProfile,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, userRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router
  .route("/admin/getusers")
  .get(isAuthenticatedUser, userRole("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, userRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, userRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, userRole("admin"), deleteUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassord);

router.route("/password/reset/:token").put(resetPassord);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;
