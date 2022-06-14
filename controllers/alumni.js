const User = require("../models/user");

module.exports.index = async (req, res) => {
  const alumnis = await User.find({ role: "alumni" });
  res.render("alumni/", { alumnis });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const alumni = await User.findById(id);
  res.render("alumni/show", { alumni });
};
