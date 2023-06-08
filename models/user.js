const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  name: { type: String },
  password: { type: String },
  role: { type: String },
  reservword: { type: String },
});

const carSchema = new Schema({
  platenumber: { type: String },
  brand: { type: String },
  state: { type: Boolean },
  dailyvalue: { type: Number },
});

const rentSchema = new Schema({
  rentnumber: { type: Number },
  username: { type: String },
  platenumber: { type: String },
  initialDate: { type: Date, default: Date.now },
  finalDate: { type: Date },
  state: { type: Boolean },
});

const returnCarSchema = new Schema({
  returnnumber: { type: Number },
  rentnumber: { type: Number },
  returnDate: { type: Date },
});

const User = mongoose.model("User", userSchema);
const Car = mongoose.model("Car", carSchema);
const Rent = mongoose.model("Rent", rentSchema);
const ReturnCar = mongoose.model("Return", returnCarSchema);

module.exports = { User, Car, Rent, ReturnCar };
