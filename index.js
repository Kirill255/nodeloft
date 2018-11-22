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
