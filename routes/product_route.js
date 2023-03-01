const router = require("express").Router();

const JWT = require("../utils/jwt");
const productController = require("../controllers/product_controller");

router.use(JWT);

router
  .route("/products")
  .get(productController.allProducts)
  .post(productController.addProduct);

router
  .route("/product/:id")
  .get(productController.singleProduct)
  .put(productController.updateProduct)
  .patch(productController.deleteProduct);

module.exports = router;
