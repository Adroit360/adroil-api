const catchAsync = require("./catchAsync");
const AppError = require("./appError");

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
    var reference;

    await this.verifyId(Model).then((result) => {
      reference = result;
    });

    const doc = await Model.create(req.body);
    doc.user = req.user.id;
    doc.refId = reference;

    await doc.save();

    res.status(201).json({ status: "success", doc });
  });
};

exports.getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    let doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("No document found", 404));
    }

    res.status(200).json({
      status: "success",
      doc,
    });
  });
};

exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    let doc = await Model.find().sort("-updatedAt");

    res.status(200).json({
      status: "success",
      doc,
    });
  });
};

exports.softDelete = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true, runValidators: true }
    );

    if (!doc) {
      return next(new AppError("No document found", 404));
    }

    res.status(200).json({ status: "success", doc });
  });
};

exports.removeObjectWithId = (arr, id) => {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  arr.splice(objWithIdIndex, 1);
  return arr;
};

exports.verifyId = async (Model) => {
  const min = 100000;
  const max = 999999;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  let existingId = await Model.findOne({ refId: randomNumber });

  while (existingId) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    existingId = await Model.findOne({ refId: randomNumber });
  }

  return randomNumber;
};

exports.checkAvailabitlity = (arr, val) => {
  let idArr = arr.map((item) => {
    return item._id.toString();
  });

  return idArr.some((result) => {
    console.log(result);
    console.log(val.toString());
    val.toString() == result;
  });
};
