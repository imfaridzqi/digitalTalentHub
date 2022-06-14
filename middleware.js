const { lowonganSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");
const Lowongan = require("./models/lowongan");
const User = require("./models/user");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // req.session.returnTo = req.originalUrl;
    req.flash("error", "Login telebih dahulu!");
    return res.redirect("/users/login");
  }
  next();
};

module.exports.validateLowongan = (req, res, next) => {
  const { error } = lowonganSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const lowongan = await Lowongan.findById(id);
  if (!lowongan.author.equals(req.user._id)) {
    req.flash("error", "Anda tidak memiliki izin untuk mengedit lowongan ini!");
    if (req.user._id && req.user.role === "alumni") {
      res.redirect("/lowongan");
    } else if (req.user._id && req.user.role === "employer") {
      res.redirect(`/employer/${req.user._id}/vacancy`);
    }
  }
  next();
};

module.exports.isAllowed = async (req, res, next) => {
  const { id } = req.params;
  const currentUser = await User.findById(id);
  if (!currentUser._id.equals(req.user.id)) {
    req.flash("error", "Anda tidak bisa mengakses halaman ini!");
    res.redirect("/alumni");
  } else {
    next();
  }
};
