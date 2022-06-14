const User = require("../models/user");
const roles = ["alumni", "employer"];

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register", { roles });
};

module.exports.regsiter = async (req, res) => {
  try {
    const { email, username, password, role, name } = req.body;
    const user = new User({ name, email, username, role });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", `Selamat datang, ${req.user.name}`);
      if (registeredUser.role === "alumni") {
        res.redirect("/lowongan");
      } else {
        res.redirect(`/employer/${registeredUser._id}/vacancy`);
      }
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/users/register");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", `Selamat datang, ${req.user.name}`);
  if (req.user.role === "alumni") {
    res.redirect("/lowongan");
  } else {
    res.redirect(`/employer/${req.user._id}/vacancy`);
  }
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Berhasil Logout");
    res.redirect("/users/login");
  });
};
