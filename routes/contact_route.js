const router = require("express").Router();

const contactController = require("../controllers/contact_controller");
const JWT = require("../utils/jwt");

router.use(JWT);

router.route("/contacts").get(contactController.allContact);

router
  .route("/contact/:id")
  .get(contactController.singleContact)
  .put(contactController.updateContact)
  .delete(contactController.deleteContact)
  .post(contactController.addContact);

router.get("/edit/contact/:id", contactController.addAccountToContact);

router.put("/unlink", contactController.unlinkAccountContact);

module.exports = router;
