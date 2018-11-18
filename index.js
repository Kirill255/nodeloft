// const argv = require("minimist")(process.argv.slice(2), { "--": true, alias: { "o": "output" } });
const fs = require("fs");
const path = require("path");
// const { promisify } = require("util");
// const asyncReaddir = promisify(fs.readdir);
// const asyncStat = promisify(fs.stat);

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

let level = 0; // уровень вложенности

process.on("exit", code => {
  // console.log("code :", code);
  if (code === 0) {
    console.log("Всё сделано!");
  }
  if (code === 1) {
    console.log("Аргументы обязательны!");
  }
  if (code === 2) {
    console.log("Папки не существует!");
  }
});

// синхронно
const readDir = (basePath, level) => {
  try {
    const files = fs.readdirSync(basePath);

    files.forEach(file => {
      let fullPath = path.join(basePath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        console.log(" ".repeat(level) + "Dir: " + file);
        readDir(fullPath, level + 2);
      } else {
        console.log(" ".repeat(level) + "File: " + file);
      }
    });
  } catch (err) {
    throw new Error(err);
  }

  // синхронно
  // try {
  //   const files = fs.readdirSync(basePath);

  //   for (const file of files) {
  //     let fullPath = path.join(basePath, file);
  //     const stat = fs.statSync(fullPath);

  //     if (stat.isDirectory()) {
  //       console.log(" ".repeat(level) + "Dir: " + file);
  //       readDir(fullPath, level + 2);
  //     } else {
  //       console.log(" ".repeat(level) + "File: " + file);
  //     }
  //   }
  // } catch (err) {
  //   throw new Error(err);
  // }

  // асинхронно
  // fs.readdir(basePath, {}, (err, files) => {
  //   if (err) {
  //     throw new Error(err);
  //   }
  //   files.forEach(file => {
  //     let fullPath = path.join(basePath, file);
  //     fs.stat(fullPath, (err, stat) => {
  //       if (err) {
  //         throw new Error(err);
  //       }
  //       if (stat.isDirectory()) {
  //         console.log(" ".repeat(level) + "Dir: " + file);
  //         readDir(fullPath, level + 2);
  //       } else {
  //         console.log(" ".repeat(level) + "File: " + file);
  //       }
  //     });
  //   });
  // });

  // асинхронно
  // const readDir = async (basePath, level) => {
  //   try {
  //     const files = await asyncReaddir(basePath);

  //     for await (const file of files) {
  //       let fullPath = path.join(basePath, file);
  //       const stat = await asyncStat(fullPath);

  //       if (stat.isDirectory()) {
  //         console.log(" ".repeat(level) + "Dir: " + file);
  //         readDir(fullPath, level + 2);
  //       } else {
  //         console.log(" ".repeat(level) + "File: " + file);
  //       }
  //     }
  //   } catch (err) {
  //     throw new Error(err);
  //   }
};

if (argv["f"] || argv["folder"]) {
  let userDir = argv["folder"];
  let basePath = path.join("./", userDir);
  if (fs.existsSync(basePath)) {
    console.log("Работаем!");
    readDir(basePath, level);
  } else {
    process.exit(2);
  }
} else {
  process.exit(1);
}
