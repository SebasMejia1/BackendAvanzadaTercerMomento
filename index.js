const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Manejo de variables de entorno en el archivo .env
// Importar el archivo de las rutas
const userRoutes = require("./routers/user");

const app = express();
const port = process.env.PORT || 3200;

// Middleware para json
app.use(express.json());
// cors
app.use(cors());
// Middleware para rutas
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hola, desde API REST");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a la base de datos de MongoDB Atlas"))
  .catch((e) => console.error("Error de conexión a la base de datos" + e));

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
