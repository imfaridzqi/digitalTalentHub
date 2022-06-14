const express = require("express");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAllowed } = require("../middleware");
const router = express.Router();
const alumni = require("../controllers/alumni");
const User = require("../models/user");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.get("/", isLoggedIn, catchAsync(alumni.index));

router.get(
  "/:id/profile",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const alumni = req.user;
    res.render("alumni/profile", { alumni });
  })
);

router.get(
  "/:id/edit-profile",
  isLoggedIn,
  isAllowed,
  catchAsync(async (req, res) => {
    const alumni = req.user;
    res.render("alumni/edit-profile", { alumni });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  upload.array("image"),
  catchAsync(async (req, res) => {
    // const { id } = req.params;
    const id = req.user._id;
    const alumni = await User.findByIdAndUpdate(id, { ...req.body.alumni });
    const img = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    alumni.image.pop();
    alumni.image.push(...img);
    await alumni.save();
    req.flash("success", "Berhasil Update Profile");
    res.redirect(`/alumni/${id}`);
  })
);

// router.put("/:id", upload.single("image"), (req, res) => {
//   console.log(req.body, req.file);
//   res.send("IT WORKED!");
// });

router.get("/:id", isLoggedIn, catchAsync(alumni.show));

module.exports = router;
