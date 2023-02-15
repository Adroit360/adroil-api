const router = require("express").Router();
const leadController = require("../controllers/lead_controller");

router
  .route("/leads")
  .get(leadController.allLeads)
  .post(leadController.newLead);

router
  .route("/lead/:id")
  .get(leadController.singleLead)
  .patch(leadController.updateLead);

module.exports = router;
