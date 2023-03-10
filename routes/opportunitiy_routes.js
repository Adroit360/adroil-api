const router = require("express").Router();

const oppoController = require("../controllers/opportunities_controller");
const JWT = require("../utils/jwt");

router.use(JWT);

router.get("/opportunities", oppoController.allOpportunities);

router
  .route("/opportunity/:id")
  .get(oppoController.singleOpportunities)
  .put(oppoController.updateOpportunities)
  .patch(oppoController.deleteOpportunities)
  .post(oppoController.addOpportunity);

router.put("/edit/note/opportunity/:id", oppoController.updateWithNote);

module.exports = router;
