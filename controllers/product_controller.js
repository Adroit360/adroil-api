const Product = require("../models/product_model");
const Category = require("../models/category_model");

const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");

exports.addProduct = factory.createOne(Product);

exports.updateProduct = factory.updateOne(Product);

exports.deleteProduct = factory.softDelete(Product);

exports.allProducts = catchAsync(async (req, res) => {
  const products = await Product.find()
    .sort("-createdAt")
    .populate(["category", "user"]);

  res.status(200).json({ status: "success", products });
});

exports.singleProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No document found", 404));
  }

  res.status(200).json({
    status: "success",
    product,
  });
});
