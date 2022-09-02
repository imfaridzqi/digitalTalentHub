const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alumniSchema = new Schema({
    name: String,
    gender: String,
    tempatLahir: String,
    tanggalLahir: String,
    phone: String,
    email: String,
    alamat: String,
    alamatPengiriman: String,
    perusahaan: String,
    jobTitle: String,
    pendidikanTerakhir: String,
    jurusan: String,
    universitas: String,
    program: String,
    batch: String,
    tanggalGabung: String,
    tanggalProgram: String,
    fotoFormal: String,
    fotoNonFormal: String,
    cv: String,
    instagram: String,
    linkedin: String,
    tanggalUjian: String,
    alamatPengirimanSertifikat: String,
    noSertifikatDMS: String,
    noSertifikatBNSP: String,
    tglTerbitBNSP: String,
    tglAkhirBNSP: String,
    testimoni: String,
    bannerTestimoni: String,
});

module.exports = mongoose.model('Alumni', alumniSchema);