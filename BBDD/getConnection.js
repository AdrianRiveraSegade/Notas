const mysql = require("mysql2/promise");

//Variables de entorno necesarias
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_BBDD } = process.env;

//Variable que almacena el grupo de conexiones con la BBDD.
let pool;

//Funcion que retorna una conexion libre con la base de datos
const getConnection = async () => {
  try {
    //creamos un grupo de conexiones si aun no existe
    if (!pool) {
      pool = await mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_BBDD,
        timezone: "Z",
      });
    }
    //retornamos una conexion libre
    return await pool.getConnection();
  } catch (err) {
    console.error(err);
    throw new Error("Error a conectar con MySQL");
  }
};

//exportamos la funcion
module.exports = getConnection;
