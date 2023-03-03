const Order = require("../models/order_model");

const catchAsync = require("../utils/catchAsync");
const factory = require("../utils/handlerFactory");

exports.addOrder = catchAsync(async (req, res) => {
  var reference;

  await factory.verifyId(Order).then((result) => {
    reference = result;
  });

  let order = await Order.create(req.body);
  order.user = req.user.id;
  order.refId = reference;

  await order.save();
  res.status(200).json({ status: "success", order });
});

exports.allOrders = factory.getAll(Order);

exports.singleOrder = factory.getOne(Order);

exports.updateOrder = factory.updateOne(Order);
