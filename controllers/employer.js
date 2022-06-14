const Lowongan = require("../models/lowongan");
const User = require("../models/user");

module.exports.index = async (req, res) => {
  const employers = await User.find({ role: "employer" });
  res.render("employer", { employers });
};

module.exports.lowonganSaya = async (req, res) => {
  const { id } = req.user;
  const employer = await User.findById(id).populate("lowongan");
  res.render("employer/vacancy", { employer });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const employer = await User.findById(id).populate("lowongan");
  res.render(`employer/show`, { employer });
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const employer = await User.findByIdAndDelete(id);
  res.redirect("/employer");
};

module.exports.renderNewForm = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user;
  const employer = await User.findById(id);
  if (!employer._id.equals(currentUser._id)) {
    req.flash("error", "Anda tidak bisa mengakses halaman ini!");
    res.redirect("/lowongan");
  }
  res.render("lowongan/new", { id, currentUser });
};

module.exports.createLowongan = async (req, res) => {
  const { id } = req.params;
  const employer = await User.findById(id);
  const lowongan = new Lowongan(req.body.lowongan);
  employer.lowongan.push(lowongan);
  lowongan.employer = employer;
  await employer.save();
  await lowongan.save();
  req.flash("success", "Berhasil membuat lowongan");
  res.redirect(`/employer/${id}`);
};
