const express = require("express");
const path = require("path");
const multer = require("multer");

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  // Describes where we want to save the file
  // cb is a callback
  // second argument of cb is where we want our uploads to go, which
  // is going to be in a folder called uploads, and it's in the root
  destination(req, file, cb) {
    cb(null, "uploads/"); // null is for error
  },
  // To know how our file names to be formatted
  // null for the error
  // second argument is how we are going to create our file names
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
};

const upload = multer({ storage });

uploadRouter.post("/", upload.single("image"), (req, res) => {
  res.send({ message: "Image Uploaded", image: `/${req.file.path}` });
});

module.exports = uploadRouter;
