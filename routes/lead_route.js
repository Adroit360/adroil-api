const router = require("express").Router();

const leadController = require("../controllers/lead_controller");
const JWT = require("../utils/jwt");

router
  .route("/leads")
  .get(leadController.allLeads)
  .post(JWT, leadController.newLead);

router
  .route("/lead/:id")
  .get(leadController.singleLead)
  .patch(leadController.updateLead);

router.put("/note/lead/:id", JWT, leadController.updateWithNote);

module.exports = router;
