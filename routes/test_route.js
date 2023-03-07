const router = require("express").Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const testController = require("../controllers/test_controller");

router.post("/test", upload.single("csv"), testController.uploadFile);

module.exports = router;
