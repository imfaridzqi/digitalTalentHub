const Alumni = require('../models/alumni');
const Program = require('../models/program');

module.exports.index = async (req, res) => {
    const alumnis = await Alumni.find({});
    const programs = await Program.find({});

    if (req.user.role === "admin") {
        res.render("alumni/", {alumnis, programs});
    } else {
        res.render("user/");
    }
};

module.exports.create = async (req, res) => {
    const alumni = new Alumni(req.body.alumni);
    await alumni.save();
    req.flash("success", "Berhasil menambahkan data alumni!");
    res.redirect(`/alumni/${alumni._id}`); 
};

module.exports.show = async(req, res) => {
    const {id} = req.params;
    const alumni = await Alumni.findById(id);
    const programs = await Program.find({});
    if (!alumni) {
        req.flash("error", "Data alumni tidak ditemukan atau telah dihapus!");
        return res.redirect("/alumni");
    }
    res.render('alumni/show', {alumni, programs});
};

module.exports.renderEditForm = async(req, res) => {
    const {id} = req.params;
    const alumni = await Alumni.findById(id);
    res.render('alumni/edit', {alumni});
};

module.exports.edit = async(req, res) => {
    const {id} = req.params;
    const alumni = await Alumni.findByIdAndUpdate(id, {...req.body.alumni});
    req.flash("success", `Berhasil mengedit data ${alumni.name}`)
    res.redirect(`/alumni/${alumni._id}`);
};

module.exports.delete = async(req, res) => {
    const { id } = req.params;
    const alumni = await Alumni.findByIdAndDelete(id);
    req.flash("success", `Berhasil menghapus data ${alumni.name}`)
    res.redirect('/alumni');
};