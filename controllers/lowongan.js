const Lowongan = require("../models/lowongan");

module.exports.index = async (req, res) => {
  const lowongans = await Lowongan.find({})
    .populate("employer")
    .populate("author");
  res.render("lowongan", { lowongans });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const lowongan = await Lowongan.findById(id)
    .populate("employer")
    .populate("author");
  if (!lowongan) {
    req.flash("error", "Lowongan tidak ditemukan atau telah dihapus");
    res.redirect("/lowongan");
  }
  res.render("lowongan/show", { lowongan });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const lowongan = await Lowongan.findById(id);
  if (!lowongan) {
    req.flash("error", "Lowongan tidak ditemukan atau telah dihapus");
    res.redirect("/lowongan");
  }
  res.render("lowongan/edit", { lowongan });
};

module.exports.editLowongan = async (req, res) => {
  const { id } = req.params;
  const lowongan = await Lowongan.findByIdAndUpdate(id, {
    ...req.body.lowongan,
  });
  req.flash("success", "Berhasil edit lowongan");
  res.redirect(`/lowongan/${lowongan._id}`);
};

module.exports.deleteLowongan = async (req, res) => {
  const { id } = req.params;
  await Lowongan.findByIdAndDelete(id);
  req.flash("success", "Lowongan berhasil dihapus");
  res.redirect("/lowongan");
};
