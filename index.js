const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres", // при установке самой базы на компьютер мы не меняли имя, по умолчанию оно postgres
  host: "localhost",
  database: "test",
  password: "", // при установке мы не ставили пароль
  port: 5432, // это тоже номер порта по умолчанию
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

async function connect () {
  const db = await pool.connect();

  const data = await db.query("SELECT * FROM students");
  console.log("data :", data.rows);

  db.release();
  pool.end().then(() => console.log("pool has ended"));
}
connect();
