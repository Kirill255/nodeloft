// const fs = require("fs");
const fs = require("fs-extra");
const path = require("path");

const parseArgs = require("minimist");
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    "f": "folder",
    "o": "output",
    "d": "delete"
  }
});
console.dir(argv);

let outputDirPath;

process.on("exit", code => {
  // console.log("code :", code);
  // номера кодов выхода я придумываю сам, главное что 0 - это нет ошибок, а всё что больше это ошибка, дальше выбирайте сами
  // 1 - это в принипе код любой ошибки, поэтому его лучше тоже не занимать, так как он будет выпадать при любой ошибке, а не только в вашем кейсе
  switch (code) {
    case 0:
      console.log("--------------");
      console.log("Конец работы!");
      break;
    case 5:
      console.log("Проверьте аргументы 'f' и 'o', они обязательны!");
      break;
    case 6:
      console.log("Папки 'f' не существует!");
      break;
    case 7:
      console.log("Папка 'o' для вывода уже существует!");
      break;
    default:
      console.log("Что-то пошло не так! Прочтите доку!");
      break;
  }
});

const readDir = (basePath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(basePath)
      .then(files => {
        resolve(checkFiles(basePath, files));
      })
      .catch(err => {
        reject(err);
      });
  });
};

const checkFiles = (basePath, files) => {
  return new Promise((resolve, reject) => {
    let allPromises = [];
    try {
      files.forEach((file, i) => {
        let fullPath = path.join(basePath, file);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          allPromises[i] = readDir(fullPath);
        } else {
          allPromises[i] = Promise.resolve({ name: file, _path: fullPath });
        }
      });
    } catch (err) {
      reject(err);
    }

    Promise.all(allPromises)
      .then(res => {
        resolve(flattenArray(res));
      })
      .catch(err => {
        reject(err);
      });
  });
};

const flattenArray = (arr) => {
  let result = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

const copyFiles = (files, dist) => {
  return new Promise((resolve, reject) => {
    let allPromises = [];
    try {
      files.forEach((file, i) => {
        let newFolder = file.name.charAt(0).toUpperCase(); // если файл называется например `eee.txt`, то -> E
        let pathNewFolder = path.join(dist, newFolder); // ./result/E
        if (!fs.existsSync(pathNewFolder)) {
          fs.mkdirSync(pathNewFolder); // создаём эту папку E, если её нету
        }
        // копируем файл `./testfolder/eee.txt`  в  `./result/E/eee.txt` -> `path.join('./result/E', 'eee.txt')`
        allPromises[i] = fs.copyFile(file._path, path.join(pathNewFolder, file.name)); // метод возвращает промис, мы их складываем в массив, тоесть в allPromises у нас будет массив промисов
      });
    } catch (err) {
      reject(err);
    }

    // выполняем се наши промисы, тоесть копируем все файлы
    Promise.all(allPromises)
      .then(() => { // .then(res => {}
        // в res нам ничего не приходит, там по идее массив с кучей undefined, так как при копировании возвращается как раз undefined, поэтому смысла передовать его дальше нету, resolve(res);
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

if (argv["f"] && argv["o"]) {
  let userDir = argv["folder"];
  let outputDir = argv["output"];

  let basePath = path.join("./", userDir);
  outputDirPath = path.join("./", outputDir);

  if (fs.existsSync(basePath)) {
    if (fs.existsSync(outputDirPath)) {
      process.exit(7);
      // fs.rmdirSync(outputDirPath);
      // fs.mkdirSync(outputDirPath);
    } else {
      fs.mkdirSync(outputDirPath);

      console.log("Начало работы!");
      console.log("--------------");
      readDir(basePath)
        .then(files => {
          // console.log("files :", files);
          return copyFiles(files, outputDirPath); // тут нужно передать промис дальше, чтобы перейти в следующий then, даже если мы знаем что он нам возвращает почти ничего, массив с undefined
        })
        .then(() => {
          // после того как всё скопировалось проверяем нужно ли удалить исходную папку
          if (argv["d"]) {
            fs.remove(basePath)
              .then(() => {
                console.log("Исходная папка удалена!");
              });
          }
        })
        .then(() => {
          console.log("Файлы скопированы!");
        })
        .catch(err => {
          console.log("err :", err);
        });
    }
  } else {
    process.exit(6);
  }
} else {
  process.exit(5);
}
