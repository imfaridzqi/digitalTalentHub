const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const lowongan = require("../controllers/lowongan");
const { isLoggedIn, isAuthor, validateLowongan } = require("../middleware");

router.get("/", isLoggedIn, catchAsync(lowongan.index));

router
  .route("/:id")
  .get(isLoggedIn, catchAsync(lowongan.show))
  .put(
    isLoggedIn,
    isAuthor,
    validateLowongan,
    catchAsync(lowongan.editLowongan)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(lowongan.deleteLowongan));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(lowongan.renderEditForm)
);

module.exports = router;

// router.get("/lowongan/new", (req, res) => {
//   res.render("lowongan/new");
// });

// router.post(
//   "/",
//   validateLowongan,
//   catchAsync(async (req, res, next) => {
//     const lowongan = new Lowongan(req.body.lowongan);
//     await lowongan.save();
//     res.redirect(`/lowongan/${lowongan._id}`);
//   })
// );
