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
  let usuario = req.body;
  const user = await User.findOne({ username: usuario.username });
  if (user) {
    console.log("El usuario existe");
    if (user.password == usuario.password) {
      console.log("Las contraseñas coinciden");
      res.json({ role: user.role });
      console.log(user.role);
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
  const user = User(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* CAR
router.post("/cars", cors(), async (req, res) => {
  const car = Car(req.body);
  const car2 = await Car.findOne({ platenumber: car.plateNumber });
  if (!car2) {
    car
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ error: error }));
  } else {
    res.json({ error: "Placa ya existe" });
  }
});
//* RENT
router.post("/rents", cors(), async (req, res) => {
  const rent = Rent(req.body);

  const car = await Car.findOne({ platenumber: rent.platenumber });
  if(car.state){
    rent
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));

  Car.updateOne({ _id: car._id }, { $set: { state: false } })
.then((data)=> console.log(data))
  .catch((error)=> console.log(error));
  }else{
    res.json({error: "Auto no disponible"})
  }
});
//* RETURN
router.post("/returns", cors(), async (req, res) => {
  const returnCar = ReturnCar(req.body);
  returnCar
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));

  const rent = await Rent.findOne({ rentnumber: returnCar.rentnumber });

  Rent.updateOne({ _id: rent._id }, { $set: { state: false } })
    .then((data)=> console.log(data))
    .catch((error)=> console.log(error));

  const car = await Car.findOne({ platenumber: rent.platenumber });

  Car.updateOne({ _id: car._id }, { $set: { state: true } })
    .then((data)=> console.log(data))
    .catch((error)=> console.log(error));
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
router.get("/cars/:plateNumber", cors(), async (req, res) => {
  const { plateNumber } = req.params;
  const car = await Car.findOne({ platenumber: plateNumber });
  if (car) {
    Car.findById(car._id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ error: error }));
  } else {
    res.json({ error: "Auto no existe" });
  }
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
//* FORGOT  
router.put("/forgot/:username", cors(), (req, res) => {
  const { username } = req.params;
  const { reservword, newpassword, } = req.body;
  console.log(reservword, newpassword, username)
  User.updateOne({ username: username }, { $set: { reservword, password:newpassword  } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
});
//* CAR
router.put("/cars/:plateNumber", cors(), (req, res) => {
  const { plateNumber } = req.params;
  const { brand, dailyvalue } = req.body;
  Car.updateOne({ platenumber: plateNumber }, { $set: { brand, dailyvalue } })
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
router.delete("/cars/:plateNumber", cors(), async (req, res) => {
  const { plateNumber } = req.params;
  const car = await Car.findOne({ platenumber: plateNumber });
  if (car) {
    Car.deleteOne({ _id: car._id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ error: error }));
  } else {
    res.json({ error: "El carro no existe" });
  }
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
