const AppError = require("./appError");
const catchAsync = require("./catchAsync");

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found", 404));
    }

    res.status(204).json({ status: "success", data: null });
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found", 404));
    }

    res.status(200).json({ status: "success", doc });
  });
};

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    doc.user = req.user;

    res.status(201).json({ status: "success", doc });
  });
};

exports.getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    let doc = Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("No document found", 404));
    }

    res.status(200).json({
      status: "success",
      doc,
    });
  });
};
