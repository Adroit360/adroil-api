const router = require("express").Router();

const oppoController = require("../controllers/opportunities_controller");
const JWT = require("../utils/jwt");

router.use(JWT);

router.get("/opportunities", oppoController.addOpportunity);

router
  .route("/opportunity/:id")
  .get(oppoController.singleOpportunities)
  .put(oppoController.updateOpportunities)
  .patch(oppoController.deleteOpportunities)
  .post(oppoController.addOpportunity);

module.exports = router;
