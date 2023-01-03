//importamos la funcion que retorna la conexion con la BBDD
const getConnection = require("./getConnection");

const bcrypt = require("bcrypt");

const main = async () => {
  let connection;

  try {
    //Obtenemos una conexion libre
    connection = await getConnection();

    console.log("Borrando tablas existentes...");

    await connection.query("DROP TABLE IF EXISTS entryPhotos");
    await connection.query("DROP TABLE IF EXISTS entryNotes");
    await connection.query("DROP TABLE IF EXISTS categories");
    await connection.query("DROP TABLE IF EXISTS users");

    console.log("creando tablas...");

    await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(70) UNIQUE NOT NULL,
      password VARCHAR(70) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      modifiedAt TIMESTAMP)`);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      categoryName VARCHAR (30),
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      modifiedAt TIMESTAMP)`);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS entryNotes (
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(35),
      text TEXT,
      categories_id INT UNSIGNED,
      FOREIGN KEY (categories_id) REFERENCES categories(id),
      users_id INT UNSIGNED,
      FOREIGN KEY (users_id) REFERENCES users(id),
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      modifiedAt TIMESTAMP)`);

    await connection.query(`
    CREATE TABLE IF NOT EXISTS entryPhotos(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100),
      entryNotes_id INT UNSIGNED,
      FOREIGN KEY (entryNotes_id) REFERENCES entryNotes(id),
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      modifiedAt TIMESTAMP)`);

    console.log("¡Tablas creadas!");

    //insertamos algunas categorias
    await connection.query(
      `
            INSERT INTO categories (categoryName)
            VALUES ("deportes"),
            ("tecnologia")            
        `
    );

    console.log("Categorias creadas");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();

    //cerramos el proceso
    process.exit();
  }
};

//ejecutamos la funcion main
main();
