const router = require("express").Router();

const leadController = require("../controllers/lead_controller");
const JWT = require("../utils/jwt");

router.use(JWT);

router
  .route("/leads")
  .get(leadController.allLeads)
  .post(leadController.newLead);

router
  .route("/lead/:id")
  .get(leadController.singleLead)
  .patch(leadController.updateLead);

router.put("/note/lead/:id", leadController.updateWithNote);

router.post("/upload/leads", leadController.updateLead);

module.exports = router;
