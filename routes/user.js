const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router.get("/", user.index);

router.route("/register")
    .get(user.renderRegisterForm)
    .post(catchAsync(user.register));

router.route("/login")
    .get(user.renderLoginForm)
    .post(passport.authenticate("local", {failureFlash: true, failureRedirect: "/user/login"}), user.login);

router.get("/logout", user.logout)


module.exports = router;