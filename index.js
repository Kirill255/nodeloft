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

  // await db.query("INSERT INTO students(s_id, name, start_year) VALUES ($1, $2, $3)", [1567, "Сергей", 2018]); // вставить запись
  // await db.query("UPDATE students SET start_year = $1 WHERE s_id = $2", [2016, 1567]); // обновить запись
  // await db.query("DELETE FROM students WHERE s_id = $1", [1567]); // удалить запись

  const data = await db.query("SELECT * FROM students");
  // console.log("data.rows :", data.rows);

  data.rows.forEach(student => {
    console.log(`s_id: ${student.s_id} | name: ${student.name} | start_year: ${student.start_year}`);
  });

  await db.end();
}
connect();
