require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const path = require("path");
const { newUser, loginUser } = require("./USERS");
const { newNote } = require("./NOTES");

const { PORT, UPLOADS_DIR } = process.env;
//Creamos un servidor express
const app = express();

// middleware recursos staticos
// Ej: http://localhost:4000/a.webp
const staticDirPath = path.join(__dirname, UPLOADS_DIR);
app.use(express.static(staticDirPath));

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

//Registrar a un usuario
app.post("/users", newUser);
//Log in usuario
app.post("/users/login", loginUser);
//crear nota  PONER EL ISAUTH
app.post("/notas", newNote);

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
