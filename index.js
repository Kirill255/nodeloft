const { Client } = require("pg");
const db = new Client({
  user: "postgres", // при установке самой базы на компьютер мы не меняли имя, по умолчанию оно postgres
  host: "localhost",
  database: "test",
  password: "", // при установке мы не ставили пароль
  port: 5432 // это тоже номер порта по умолчанию
});

db.connect();

db.query("SELECT * FROM students", (err, data) => {
  if (err) {
    throw new Error(err);
  }
  // console.log("data", data); // если мы посмотрим на возвращаемые данные, мы увидим что нам нужно поле rows
  // console.log("data.rows :", data.rows);

  data.rows.forEach(student => {
    console.log(`s_id: ${student.s_id} | name: ${student.name} | start_year: ${student.start_year}`);
  });
  /*
  s_id: 1451 | name: Анна | start_year: 2014
  s_id: 1432 | name: Виктор | start_year: 2014
  s_id: 1556 | name: Нина | start_year: 2015
 */
  db.end();
});
