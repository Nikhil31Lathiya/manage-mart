const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/", userController.getSignUpForm);
router.post("/signup", userController.addUser);
router.get("/login", userController.getLoginForm);

router.post("/login", userController.handleLogin);

router.get(
  "/shop",
  auth.verifyToken,
  auth.verifyRole("user"),
  userController.getShop
);
router.get(
  "/product/:id",
  auth.verifyToken,
  auth.verifyRole("user"),
  userController.getProductDetails
);
router.post(
  "/cart",
  auth.verifyToken,
  auth.verifyRole("user"),
  userController.addToCart
);
router.get(
  "/cart",
  auth.verifyToken,
  auth.verifyRole("user"),
  userController.viewCart
);
router.post(
  "/cart/increase",
  auth.verifyToken,
  auth.verifyRole("user"),
  userController.increaseQuantity
);
router.post(
  "/cart/decrease",
  auth.verifyToken,
  auth.verifyRole("user"),
  userController.decreaseQuantity
);

// Routes for order confirmation and downloading the bill
router.get(
  "/order",
  auth.verifyToken,
  auth.verifyRole("user"),
  userController.viewOrder
);
router.post(
  "/order/confirm",
  auth.verifyToken,
  auth.verifyRole("user"),
  userController.confirmOrder
);
router.get(
  "/order/download",
  auth.verifyToken,
  auth.verifyRole("user"),
  userController.downloadBill
);

router.get(
  "/logout",
  auth.verifyToken,
  auth.verifyRole(["admin", "user"]),
  userController.logout
);
module.exports = router;
