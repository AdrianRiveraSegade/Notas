require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const { PORT, UPLOADS_DIR } = process.env;
//Creamos un servidor express
const app = express();

//Middleware que indica los directorios estaticos
//app.use(express.static(UPLOADS_DIR));

//Middleware que deserializa un body en formato "raw" creando la propiedad body en el objeto request
app.use(express.json());

//Middleware que deserializa un body en formato "form-data" creando la propiedad files en el objeto request
app.use(fileUpload());

//Middleware para mostrar información  sobre la petición
app.use(morgan("dev"));

/*
    ###########################
    #  Middleware de usuarios #
    ###########################
*/

const { newUser } = require("./USERS/index");

//Registrar a un usuario pendiente de validar
app.post("/users", newUser);

/*
    ###########################
    #Controladores intermedios#
    ###########################
*/

//por ahora vacio, se llenará cuando sea pertinente

app.use((req, res) => {
  res.send("dame tus ordenes, amo");
}); //para comprobar que el servidor esta activo

/*
    ##################
    #Middleware notas#
    ##################
*/

//por ahora vacio, se llenará cuando sea pertinente

/*
    ###############################
    Middleware de error o not found
    ###############################
*/

//Para error
app.use((err, req, res, _) => {
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
