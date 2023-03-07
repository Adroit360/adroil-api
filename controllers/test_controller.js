const multer = require("multer");
const csv = require("csvtojson");

const Test = require("../models/test_model");

const upload = multer({ dest: "uploads/" });

exports.uploadFile = (req, res) => {
  csv()
    .fromFile(req.file.path)
    .then((fileObj) => {
      var items = [];
      for (var i = 0; i < fileObj.length; i++) {
        var obj = {};
        obj.title = fileObj[i]["title"];
        obj.data = fileObj[i]["data"];

        items.push(obj);
      }

      Test.insertMany(items).then(() => {
        res.status(200).send({
          message: "Successfully Uploaded!",
        });
      });
    });
};
