require("dotenv").config();

const express = require("express");

const morgan = require("morgan");

const { PORT } = process.env;
//Creamos un servidor express
const app = express();

//Middleware para mostrar información  sobre la petición
app.use(morgan("dev"));

app.use((req, res) => {
  res.send("dame tus ordenes, amo");
});

/*
    ###############################
    Middleware de error o not found
    ###############################
*/

//Para error
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
});

//Para ruta no encontrada

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada",
  });
});

//Ponemos el servidor a escuchar peticiones en un puerto
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
