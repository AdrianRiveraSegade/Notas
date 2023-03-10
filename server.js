require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const path = require("path");
const { newUser, loginUser } = require("./USERS");
const { newNote, getNote } = require("./NOTES");
const isAuth = require("./middleware/isAuth");
const listNotes = require("./middleware/listNotes");
const modNote = require("./middleware/modNote");
const cors = require("cors");

const { PORT, UPLOADS_DIR } = process.env;
//Creamos un servidor express
const app = express();

// añado middleware cors para aceptar peticiones desde React
app.use(cors());

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
    #  End point de usuarios #
    ###########################
*/

//Registrar a un usuario
app.post("/users", newUser);

//Log in usuario
app.post("/users/login", loginUser);

/*
    ###########################
    #  End point de notas #
    ###########################
*/

//crear nota
app.post("/notas", isAuth, newNote);

// ver listado de notas (solo ver titulos)
app.get("/notas", isAuth, listNotes); // Aiuda, no me da la info que le pido

// visualiar una nota
app.get("/notas/:id", isAuth, getNote);

// modificar notas (titulo, texto y categoria)
app.put("/notas/:id", isAuth, modNote);

/*
    ###############################
    Middleware de error o not found
    ###############################
*/

//Para error
app.use((err, req, res, next) => {
  //console.error(err);

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
