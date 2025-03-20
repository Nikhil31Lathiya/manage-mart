const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/auth");
// router.get("/", (req, res) => {
//   res.redirect("/admin/login");
// });
// Display the login page when /admin is accessed
// router.get("/login", adminController.getLoginPage);

// Handle admin login logic
// router.post("/login", adminController.handleLogin);

router.get(
  "/dashboard",
  auth.verifyToken,
  auth.verifyRole("admin"),
  adminController.getDashboard
);
router.get(
  "/add-product",
  auth.verifyToken,
  auth.verifyRole("admin"),
  adminController.getAddProductPage
);
router.post(
  "/products/add",
  auth.verifyToken,
  auth.verifyRole("admin"),
  adminController.addProduct
);

// Route to show the Edit Product form
router.get(
  "/products/edit/:id",
  auth.verifyToken,
  auth.verifyRole("admin"),
  adminController.getEditProductPage
);

// Route to handle Edit Product form submission
router.post(
  "/products/edit/:id",
  auth.verifyToken,
  auth.verifyRole("admin"),
  adminController.editProduct
);

router.post(
  "/products/delete/:id",
  auth.verifyToken,
  auth.verifyRole("admin"),
  adminController.deleteProduct
);

router.get(
  "/logout",
  auth.verifyToken,
  auth.verifyRole(["admin", "user"]),
  adminController.logout
);

module.exports = router;
