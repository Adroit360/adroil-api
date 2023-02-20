const router = require("express").Router();

const accountController = require("../controllers/account_controller");
const JWT = require("../utils/jwt");

router.use(JWT);

router
  .route("/accounts")
  .get(accountController.allAccount)
  .post(accountController.addAccount);

router
  .route("/account/:id")
  .get(accountController.singleAccount)
  .put(accountController.updateAccount)
  .patch(accountController.deacivateAccount);

module.exports = router;
