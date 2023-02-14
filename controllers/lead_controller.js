const Lead = require("../models/lead_model");
const factory = require("../utils/handlerFactory");

exports.newLead = factory.createOne(Lead);
