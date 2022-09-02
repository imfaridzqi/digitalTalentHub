const express = require('express');
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const alumni = require("../controllers/alumni");
const {isLoggedIn, isAdmin} = require("../middleware");

router.route("/")
    .get(isLoggedIn, isAdmin ,catchAsync(alumni.index))
    .post(isLoggedIn, isAdmin, catchAsync(alumni.create));

router.route("/:id")
    .get(isLoggedIn, isAdmin,catchAsync(alumni.show))
    .put(isLoggedIn, isAdmin,catchAsync(alumni.edit))
    .delete(isLoggedIn, isAdmin,catchAsync(alumni.delete));

router.get('/:id/edit', isLoggedIn, isAdmin,catchAsync(alumni.renderEditForm));

module.exports = router;