const express = require("express");
var cors = require("cors");
// importar el esquema de models
const { User, Car, Rent, ReturnCar } = require("../models/user");

const router = express.Router();
// Middleware
router.use(cors());
// Rutas
//* LOGIN
router.post("/login", async (req, res) => {
  let { username, password } = req.params;
  console.log(username, password);
  const user = await User.findOne({ username: username }, { err, data });
  if (user) {
    console.log("El usuario existe");
    if (user.password == password) {
      console.log("Las contraseñas coinciden");
    } else {
      console.log(user);
      console.log(user.password);
      console.log("La contraseña es incorrecta");
      res.json({ error: "La contraseña es incorrecta" });
    }
  } else {
    res.json({ error: "El usuario no existe debe registrarse" });
    console.log("El usuario no existe debe registrarse");
    console.log(user);
  }
});
// Agregar
//* USER
router.post("/users", cors(), (req, res) => {
  const { user } = User(req.params);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* CAR
router.post("/cars", cors(), (req, res) => {
  const { car } = Car(req.params);
  car
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* RENT
router.post("/rents", cors(), (req, res) => {
  const { rent } = Rent(req.params);
  rent
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* RETURN
router.post("/returns", cors(), (req, res) => {
  const { returnCar } = ReturnCar(req.body);
  returnCar
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});

// Recuperar todos los datos
//* USER
router.get("/users", cors(), (req, res) => {
  User.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* CAR
router.get("/cars", cors(), (req, res) => {
  Car.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* RENT
router.get("/rents", cors(), (req, res) => {
  Rent.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* RETURN
router.get("/returns", cors(), (req, res) => {
  ReturnCar.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});

// Recuperar por id
//* USER
router.get("/users/:id", cors(), (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* CAR
router.get("/cars/:id", cors(), (req, res) => {
  const { id } = req.params;
  Car.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* RENT
router.get("/rents/:id", cors(), (req, res) => {
  const { id } = req.params;
  Rent.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* RETURN
router.get("/returns/:id", cors(), (req, res) => {
  const { id } = req.params;
  ReturnCar.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});

// Actualizar por id
//* USER
router.put("/users/:id", cors(), (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  User.updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* CAR
router.put("/cars/:id", cors(), (req, res) => {
  const { id } = req.params;
  const { brand, dailyvalue } = req.body;
  Car.updateOne({ _id: id }, { $set: { brand, dailyvalue } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* RENT
router.put("/rents/:id", cors(), (req, res) => {
  const { id } = req.params;
  const { username, finalDate, platenumber } = req.body;
  Rent.updateOne({ _id: id }, { $set: { username, finalDate, platenumber } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* RETURN
router.put("/returns/:id", cors(), (req, res) => {
  const { id } = req.params;
  const { rentnumber, returnDate } = req.body;
  ReturnCar.updateOne({ _id: id }, { $set: { rentnumber, returnDate } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});

// Eliminar por id
//* USER
router.delete("/users/:id", cors(), (req, res) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* Car
router.delete("/cars/:id", cors(), (req, res) => {
  const { id } = req.params;
  Car.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* RENT
router.delete("/rents/:id", cors(), (req, res) => {
  const { id } = req.params;
  Rent.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* RETURN
router.delete("/returns/:id", cors(), (req, res) => {
  const { id } = req.params;
  ReturnCar.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});

module.exports = router;
