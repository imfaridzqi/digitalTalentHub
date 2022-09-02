const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programSchema = new Schema({
    nama: String
});

module.exports = mongoose.model("Program", programSchema);