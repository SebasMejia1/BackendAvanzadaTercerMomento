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
  state: { type: Boolean, default:true },
  dailyvalue: { type: Number },
});

const rentSchema = new Schema({
  rentnumber: { type: Number, unique: true },
  username: { type: String },
  platenumber: { type: String },
  initialDate: { type: Date },
  finalDate: { type: Date },
  state: { type: Boolean, default: true },
});

// Genera el valor del campo autonumérico antes de guardar el documento
rentSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const lastDocument = await this.constructor
      .findOne({}, { rentnumber: 1 })
      .sort({ rentnumber: -1 });
    if (lastDocument) {
      this.rentnumber = lastDocument.rentnumber + 1;
    } else {
      this.rentnumber = 1;
    }
  } catch (error) {
    return next(error);
  }

  next();
});

const returnCarSchema = new Schema({
  returnnumber: { type: Number, unique: true },
  rentnumber: { type: Number },
  returnDate: { type: Date },
});

returnCarSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const lastDocument = await this.constructor
      .findOne({}, { rentnumber: 1 })
      .sort({ rentnumber: -1 });
    if (lastDocument) {
      this.rentnumber = lastDocument.rentnumber + 1;
    } else {
      this.rentnumber = 1;
    }
  } catch (error) {
    return next(error);
  }

  next();
});

const User = mongoose.model("User", userSchema);
const Car = mongoose.model("Car", carSchema);
const Rent = mongoose.model("Rent", rentSchema);
const ReturnCar = mongoose.model("Return", returnCarSchema);

module.exports = { User, Car, Rent, ReturnCar };