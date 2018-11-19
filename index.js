const fs = require("fs");
// const fs = require("fs-extra"); // похоже этот пакет тут не нужен, так как нужный мне метод не работает на windows
const path = require("path");

const parseArgs = require("minimist");
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    "f": "folder",
    "o": "output",
    "d": "delete"
  },
  "--": true
});
console.dir(argv);

let outputDirPath;
let level = 0; // уровень вложенности

process.on("exit", code => {
  console.log("code :", code);
  // номера кодов выхода я придумываю сам, главное что 0 - это нет ошибок, а всё что больше это ошибка, дальше выбирайте сами
  // 1 - это в принипе код любой ошибки, поэтому его лучше тоже не занимать, так как он будет выпадать при любой ошибке, а не только в вашем кейсе
  switch (code) {
    case 0:
      console.log("--------------");
      console.log("Всё готово!");
      break;
    case 5:
      console.log("Проверьте аргументы, они обязательны!");
      break;
    case 6:
      console.log("Папки не существует!");
      break;
    case 7:
      console.log("Папка для вывода уже существует!");
      break;
    default:
      console.log("Что-то пошло не так! Прочтите доку!");
      break;
  }
});

// синхронно
const readDir = (basePath) => {
  try {
    const files = fs.readdirSync(basePath);

    files.forEach(file => {
      let fullPath = path.join(basePath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        readDir(fullPath);
      } else {
        let newFolder = file[0].toUpperCase();
        let pathNewFolder = path.join(outputDirPath, newFolder);
        if (!fs.existsSync(pathNewFolder)) {
          fs.mkdirSync(pathNewFolder);
        }
        // это метод fs-extra, попробовать его на ubuntu т.к., https://github.com/jprichardson/node-fs-extra#windows
        // fs.copySync(fullPath, pathNewFolder);

        // раз на windows этот метод не работает, то делаем по старинке, читаем и пишем
        fs.readFile(fullPath, { encoding: "utf8" }, (err, data) => {
          if (err) {
            throw new Error(err);
          }
          fs.writeFile(path.join(pathNewFolder, file), data, err => {
            if (err) {
              throw new Error(err);
            }
          });
        });

        // оказывается в родном fs тоже есть методы копирования(я просто не знал), и подключал fs-extra
        // к сожалению он тоже что-то не работает на windows `Error: EPERM: operation not permitted, copyfile`
        // fs.copyFileSync(fullPath, pathNewFolder);
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

// не обязательно проверять оба аргумента argv["f"] || argv["folder"], достаточно проверки любого из них, так как в любом случае создаются оба поля
// что так `node index.js --folder=testfolder --output=result`, что так `node index.js -f=testfolder -o=result`
// будут созданы 4 поля {f: 'testfolder', folder: 'testfolder', o: 'result', output: 'result'}

if (argv["f"] && argv["o"]) { // (argv["f"] || argv["folder"]) && (argv["o"] || argv["output"])
  let userDir = argv["folder"];
  let outputDir = argv["output"];
  let basePath = path.join("./", userDir);
  outputDirPath = path.join("./", outputDir);
  if (fs.existsSync(outputDirPath)) {
    process.exit(7);
    // fs.rmdirSync(outputDirPath);
    // fs.mkdirSync(outputDirPath);
  } else {
    fs.mkdirSync(outputDirPath);
  }
  if (fs.existsSync(basePath)) {
    console.log("Начало работы!");
    console.log("--------------");
    readDir(basePath, level);
  } else {
    process.exit(6);
  }
} else {
  process.exit(5);
}
