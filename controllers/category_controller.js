const Category = require("../models/category_model");
const Product = require("../models/product_model");

const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");

exports.addCategory = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);

  await category.save();
  res.status(200).json({ status: "success", category });
});

exports.updateCategory = factory.updateOne(Category);

exports.deleteCategory = factory.softDelete(Category);

exports.allCategory = factory.getAll(Category);

exports.categoryProduct = catchAsync(async (req, res) => {
  const product = await Product.find({ category: req.params.id }).populate(
    "category"
  );

  if (!product) {
    return next(new AppError("No document found", 404));
  }

  res.status(200).json({ status: "success", product });
});
