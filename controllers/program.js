const Program = require('../models/program');

module.exports.index = async(req, res) => {
    const programs = await Program.find({});
    res.render("program/index", {programs})
};

module.exports.create = async(req, res) => {
    const program = new Program(req.body.program);
    await program.save();
    req.flash("success", "Berhasil menambahkan program baru");
    res.redirect("/program")
};

module.exports.renderEditForm = async(req, res) => {
    const {id} = req.params;
    const program = await Program.findById(id);
    res.render("program/edit", {program});
};

module.exports.edit = async(req, res) => {
    const {id} = req.params;
    const program = await Program.findByIdAndUpdate(id, {...req.body.program});
    req.flash("success", "Berhasil mengedit program");
    res.redirect("/program")
};

module.exports.delete = async(req, res) => {
    const {id} = req.params;
    const program = await Program.findByIdAndDelete(id);
    req.flash("success", "Berhasil menghapus program")
    res.redirect("/program");
};