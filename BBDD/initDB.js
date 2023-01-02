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
        categories VARCHAR(30),
        createdAt TIMESTAMP NOT NULL,
        modifiedAt TIMESTAMP

        
    )`);

    await connection.query(`
    CREATE TABLE IF NOT EXIST entryPhotos(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    createdAt TIMESTAMP NOT NULL,
    modifiedAt TIMESTAMP)`);

    console.log("¡Tablas creadas!");

    //Enciptamos la contraseña del admin (NO ESTOY SEGURO SI ES USUARIO ADMIN O EL DUEÑO DE LA PAGINA)
    const adminPass = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    //insertamos el usuario administrador (PARA QUE QUEREMOS UN USUARIO ADMIN??)
    await connection.query(
      `
            INSERT INTO users (email, password, createdAt)
            VALUES ('admin@admin.com', ?, ?)
        `,
      [adminPass, new Date()]
    );

    console.log("Administrador creado");
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
