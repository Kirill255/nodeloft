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

  await db.query("CREATE TABLE groups(g_no text PRIMARY KEY, headman integer NOT NULL REFERENCES students(s_id))"); // создаём новую таблицу
  await db.query("ALTER TABLE students ADD g_no text REFERENCES groups(g_no)"); // в уже существующую таблицу нужно добавить новый столбец который связывает наши таблицы

  await db.query("BEGIN"); // начинаем транзакцию
  await db.query("INSERT INTO groups(g_no, headman) SELECT $1, s_id FROM students WHERE name = $2", ["Loft-05", "Анна"]); // вставляем запись, название группы и староста Анна
  await db.query("UPDATE students SET g_no = $1", ["Loft-05"]); // переведем всех студентов в созданную группу
  await db.query("COMMIT"); // завершаем транзакцию

  const students = await db.query("SELECT * FROM students");
  console.log("students :", students.rows);

  // добавлен новый столбец с названием группы
  /*
  [ { s_id: 1451, name: 'Анна', start_year: 2014, g_no: 'Loft-05' },
  { s_id: 1432, name: 'Виктор', start_year: 2014, g_no: 'Loft-05' },
  { s_id: 1556, name: 'Нина', start_year: 2015, g_no: 'Loft-05' } ]
  */

  const groups = await db.query("SELECT * FROM groups");
  console.log("groups :", groups.rows);

  // создана новая таблица "группы"
  /*
  [ { g_no: 'Loft-05', headman: 1451 } ]
  */

  await db.end();
}
connect();
