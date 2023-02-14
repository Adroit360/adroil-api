const router = require("express").Router();
const UserController = require("../controllers/user_controller");

router.get("/users", UserController.allUsers);

module.exports = router;
