import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "admin",
  password: "admin",
  database: "cafe",
});

export default db;
