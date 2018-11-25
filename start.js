const cluster = require("cluster");
const { cpus } = require("os"); // array with number of cores

function startWorker () {
  const worker = cluster.fork();
  console.log(`Start cluster : ${worker.id}`);
}

if (cluster.isMaster) {
  cpus().forEach(() => { // run a worker on each core
    startWorker();
  });

  cluster.on("disconnect", (worker) => {
    console.log(`Crushed worker: ${worker.id}`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log("Worker %d died with exit code %d (%s). restarting...", worker.id, code, signal);
    startWorker();
  });
} else {
  require("./index.js")();
}
