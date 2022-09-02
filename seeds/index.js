const mongoose = require('mongoose');
const Alumni = require('../models/alumni');
const mock = require("./MOCK_DATA");

mongoose.connect("mongodb+srv://admin-irfan:Uw7EMoFl60jeCtLV@cluster0.davjs.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Alumni.deleteMany({});
    for (let i = 0; i <= mock.length; i++) {
        const alumni = new Alumni({
            name: mock[i].name,
            gender: mock[i].gender,
            tempatLahir: mock[i].tempatLahir,
            tanggalLahir: mock[i].tanggalLahir,
            phone: mock[i].phone,
            email: mock[i].email,
            alamat: mock[i].alamat,
            alamatPengiriman: mock[i].alamatPengiriman,
            perusahaan: mock[i].perusahaan,
            jobTitle: mock[i].jobTitle,
            pendidikanTerakhir: mock[i].pendidikanTerakhir,
            jurusan: mock[i].jurusan,
            universitas: mock[i].universitas,
            program: mock[i].program,
            batch: mock[i].batch,
            tanggalGabung: mock[i].tanggalGabung,
            tanggalProgram: mock[i].tanggalProgram,
            fotoFormal: mock[i].fotoFormal,
            fotoNonFormal: mock[i].fotoNonFormal,
            cv: mock[i].cv,
            instagram: mock[i].instagram,
            linkedin: mock[i].linkedin,
            tanggalUjian: mock[i].tanggalUjian,
            alamatPengirimanSertifikat: mock[i].alamatPengirimanSertifikat,
            noSertifikatDMS: mock[i].noSertifikatDMS,
            noSertifikatBNSP: mock[i].noSertifikatBNSP,
            tglTerbitBNSP: mock[i].tglTerbitBNSP,
            tglAkhirBNSP: mock[i].tglAkhirBNSP,
            testimoni: mock[i].testimoni,
            bannerTestimoni: mock[i].bannerTestimoni,
        });
        await alumni.save();
    }
}

seedDB();