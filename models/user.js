const mongoose = require("mongoose");
const Lowongan = require("./lowongan");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
let dateObj = new Date();
let month = dateObj.getUTCMonth();
let date = dateObj.getDate();
let year = dateObj.getFullYear();
let tglRegistrasi = date + "/" + month + "/" + year;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  name: String,
  lastName: String,
  image: [
    {
      url: String,
      filename: String,
    },
  ],
  address: String,
  phone: Number,
  industry: String,
  description: String,
  role: {
    type: String,
    lowercase: true,
    enum: ["admin", "alumni", "employer"],
  },
  lowongan: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lowongan",
    },
  ],
  applied: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lowongan",
    },
  ],
  tglRegistrasi: {
    type: String,
    default: tglRegistrasi,
  },
});
userSchema.plugin(passportLocalMongoose);

userSchema.post("findOneAndDelete", async function (user) {
  if (user.lowongan.length) {
    const res = await Lowongan.deleteMany({ _id: { $in: user.lowongan } });
  }
});

module.exports = mongoose.model("User", userSchema);
