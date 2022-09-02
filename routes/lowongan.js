const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn, isAdmin} = require("../middleware");
const lowongan = require("../controllers/lowongan");

router.route("/")
    .get(isLoggedIn, isAdmin, catchAsync(lowongan.index))
    .post(isLoggedIn, isAdmin, catchAsync(lowongan.new));

router.get("/new", isLoggedIn, isAdmin, lowongan.renderNewForm);

router.route("/:id")
    .get(isLoggedIn, isAdmin, catchAsync(lowongan.show))
    .put(isLoggedIn, isAdmin, catchAsync(lowongan.edit))
    .delete(isLoggedIn, isAdmin, catchAsync());

router.get("/:id/edit", isLoggedIn, isAdmin, catchAsync(lowongan.renderEditForm));

module.exports = router;