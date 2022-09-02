const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lowonganSchema = new Schema({
    judul: String,
    perusahaan: String,
    lokasi: String,
    salary: Number,
    tglPosting: Date,
    status: String,
    experience: String,
    skill: String,
    jobdesk: String,
    category: String,
    pelamar: String,
});

module.exports = mongoose.model("Lowongan", lowonganSchema);