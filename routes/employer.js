const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateLowongan, isAllowed } = require("../middleware");
const employer = require("../controllers/employer");
const User = require("../models/user");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.get("/", isLoggedIn, catchAsync(employer.index));

router.get("/:id/vacancy", isLoggedIn, catchAsync(employer.lowonganSaya));

router.get("/:id/profile", async (req, res) => {
  const { id } = req.params;
  const employer = await User.findById(id);
  res.render("employer/profile", { employer });
});

router.get(
  "/:id/edit-profile",
  isLoggedIn,
  isAllowed,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const employer = await User.findById(id);
    res.render("employer/edit-profile", { employer });
  })
);

router.put("/:id/", upload.array("image"), async (req, res) => {
  const { id } = req.params;
  const employer = await User.findByIdAndUpdate(id, { ...req.body.employer });
  const img = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  employer.image.pop();
  employer.image.push(...img);
  await employer.save();
  req.flash("success", "Berhasil Update Profile Perusahaan");
  res.redirect(`/employer/${employer._id}`);
});

router.get("/:id", isLoggedIn, catchAsync(employer.show));

router.delete("/:id", catchAsync(employer.delete));

router.get("/:id/lowongan/new", isLoggedIn, catchAsync(employer.renderNewForm));

router.post(
  "/:id/lowongan",
  validateLowongan,
  catchAsync(employer.createLowongan)
);

module.exports = router;

// router.get("/new", (req, res) => {
//   res.render("employer/new");
// });

// router.post(
//   "/",
//   catchAsync(async (req, res) => {
//     const employer = new User(req.body.employer);
//     await employer.save();
//     req.flash("success", "Berhasil Membuat Employer Baru");
//     res.redirect(`/employer/`);
//   })
// );
