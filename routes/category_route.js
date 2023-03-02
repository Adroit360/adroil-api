const router = require("express").Router();

const JWT = require("../utils/jwt");
const categoryController = require("../controllers/category_controller");

router.use(JWT);

router
  .route("/categories")
  .get(categoryController.allCategory)
  .post(categoryController.addCategory);

router
  .route("/category/:id")
  .put(categoryController.updateCategory)
  .patch(categoryController.deleteCategory)
  .get(categoryController.categoryProduct);

module.exports = router;
