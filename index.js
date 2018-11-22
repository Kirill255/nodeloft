const { Client } = require("pg");
const db = new Client({
  user: "postgres", // при установке самой базы на компьютер мы не меняли имя, по умолчанию оно postgres
  host: "localhost",
  database: "test",
  password: "", // при установке мы не ставили пароль
  port: 5432 // это тоже номер порта по умолчанию
});

async function connect () {
  await db.connect();

  const data = await db.query("SELECT * FROM students");
  // console.log("data.rows :", data.rows);

  data.rows.forEach(student => {
    console.log(`s_id: ${student.s_id} | name: ${student.name} | start_year: ${student.start_year}`);
  });

  await db.end();
}
connect();
