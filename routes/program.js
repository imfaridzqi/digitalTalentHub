const express = require('express');
const router = express.Router();
const program = require("../controllers/program");
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn, isAdmin} = require("../middleware");

router.route("/")
    .get(isLoggedIn, isAdmin, catchAsync(program.index))
    .post(isLoggedIn, isAdmin, catchAsync(program.create));

router.route("/:id")
    .get(isLoggedIn, isAdmin, catchAsync(program.renderEditForm))
    .put(isLoggedIn, isAdmin, catchAsync(program.edit))
    .delete(isLoggedIn, isAdmin, catchAsync(program.delete));

module.exports = router;