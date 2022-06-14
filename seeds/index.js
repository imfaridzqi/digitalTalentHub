const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Lowongan = require("../models/lowongan");

mongoose.connect("mongodb://localhost:27017/digitalTalentHubDB", {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Lowongan.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const salary = Math.floor(Math.random() * 1000000);
    const random1000 = Math.floor(Math.random() * 1000);
    const lowongan = new Lowongan({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "http://source.unsplash.com/collection/484351",
      salary: salary,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    });
    await lowongan.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
