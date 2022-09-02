const Lowongan = require("../models/lowongan");

module.exports.index = async (req, res) => {
    const lowongan = await Lowongan.find({});
    res.render("lowongan/", {lowongan});
};

module.exports.renderNewForm = (req, res) => {
    res.render("lowongan/new");
};

module.exports.new = async(req, res) => {
    const lowongan = new Lowongan(req.body.lowongan);
    await lowongan.save();
    req.flash("success", "Berhasil menambahkan lowongan baru");
    res.redirect(`/lowongan`); 
};

module.exports.show = async(req, res) => {
    const {id} = req.params;
    const lowongan = await Lowongan.findById(id);
    res.render("lowongan/show", {lowongan});
};

module.exports.renderEditForm = async(req, res) => {
    const {id} = req.params;
    const lowongan = await Lowongan.findById(id);
    res.render("lowongan/edit", {lowongan});
};

module.exports.edit = async(req, res) => {
    const {id} = req.params;
    const lowongan = await Lowongan.findByIdAndUpdate(id, {...req.body.lowongan});
    req.flash("success", "Lowongan berhasil diupdate");
    res.redirect(`/lowongan/${lowongan._id}`);
};

module.exports.delete = async(req, res) => {
    const {id} = req.params;
    const lowongan = await Lowongan.findByIdAndDelete(id);
    req.flash("success", "Lowongan telah dihapus");
    res.redirect("/lowongan");
};