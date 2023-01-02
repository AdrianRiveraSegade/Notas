require("dotenv").config();

//importamos la funcion que retorna la conexion con la BBDD
const getConnection = require("./getConnection");

const bcrypt = require("bcrypt");

const main = async () => {
  let connection;

  try {
    //Obtenemos una conexion libre
    connection = await getConnection();

    console.log("Borrando tablas existentes...");

    await connection.query("DROP TABLE IF EXIST entryPhotos");
    await connection.query("DROP TABLE IF EXIST entryNotes");
    await connection.query("DROP TABLE IF EXIST categories");
    await connection.query("DROP TABLE IF EXIST users");

    console.log("creando tablas...");

    await connection.query(`
        CREATE TABLE IF NOT EXIST users (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(70) UNIQUE NOT NULL,
            password VARCHAR(70) NOT NULL,
            createdAt TIMESTAMP NOT NULL,
            modifiedAt TIMESTAMP

        )`);

    await connection.query(`
        CREATE TABLE IF NOT EXIST categories (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            categoryName VARCHAR (30),
            createdAt TIMESTAMP NOT NULL,
            modifiedAt TIMESTAMP)
        )`);

    await connection.query(`
    CREATE TABLE IF NOT EXIST entryNotes (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(35),
        text TEXT,
        
    )`);
    //sin terminar, falta el join entre categories y entryNotes
  } catch (error) {}
};
