const router = require("express").Router();

const contactController = require("../controllers/contact_controller");
const JWT = require("../utils/jwt");

router.use(JWT);

router
  .route("/contacts")
  .get(contactController.allContact)
  .post(contactController.addContact);

router
  .route("/contact/:id")
  .get(contactController.singleContact)
  .put(contactController.updateContact)
  .delete(contactController.deleteContact);

module.exports = router;
