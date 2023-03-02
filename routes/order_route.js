const router = require("express").Router();

const JWT = require("../utils/jwt");
const orderController = require("../controllers/order_controller");

router.use(JWT);

router
  .route("/orders")
  .get(orderController.allOrders)
  .post(orderController.addOrder);

router
  .route("/order/:id")
  .get(orderController.singleOrder)
  .put(orderController.updateOrder);

module.exports = router;
