const router = require("express").Router();
const authController = require("../controllers/auth_controller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);

module.exports = router;
