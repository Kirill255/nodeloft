// const fs = require("fs");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("test", "postgres", "", { // new Sequelize("database", "username", "password", {});
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize.sync();
sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// подключаем модели
const modelNames = ["Teacher", "Group", "Student"];
for (const modelName of modelNames) {
  sequelize.import(`./models/${modelName}.js`);
}

// применяем все ассоциации
for (const modelName of Object.keys(sequelize.models)) {
  if ("associate" in sequelize.models[modelName]) {
    sequelize.models[modelName]
      .associate(sequelize.models);
  }
}
// настройки закончены

// создание групп
// async function createGroups () {
//   for (let i = 0; i <= 3; i++) {
//     let obj = {
//       name: `Группа ${i}`
//     };
//     await sequelize.models
//       .group
//       .create(obj);
//   }
// }
// createGroups();

// обновление групп
// Model.find has been deprecated, please use Model.findOne instead
// async function updateGroup (id) {
//   const data = await sequelize.models
//     .group
//     .findOne({
//       where: {
//         id: id
//       }
//     });

//   // const data = await sequelize.models.group.findAll(); // если найти все

//   let params = {
//     name: "Группа закрыта"
//   };

//   await data.update(params);
//   // await data.destroy(); // если нужно удалить какой-то элемент
//   fs.writeFileSync("log.json", JSON.stringify(data));
// }
// updateGroup(3); // мы создавали 4 группы, сейчас хотим обновить группу с id=3 и ещё запишем log.json

// создание учителей
async function createTeacher () {
  try {
    const params = {
      name: "Юрий Кучма",
      group: {
        name: "Серверный JS"
      },
      students: [
        {
          name: "Анна"
        },
        {
          name: "Роман"
        }
      ]
    };
    const data = await sequelize.models
      .teacher
      .create(params, {
        include: [
          {
            all: true
          }
        ]
      });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
createTeacher();
