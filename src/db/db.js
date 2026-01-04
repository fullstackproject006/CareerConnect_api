import mysql from "mysql2";
import { DB_HOST, DB_USER, DB_PASS, DB_NAME } from "../../config.js";

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return;
  }
  console.log("✅ MySQL connected");
});

export default db;