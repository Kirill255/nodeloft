const express = require("express");
const errorhandler = require("errorhandler");
const notifier = require("node-notifier");

const app = express();

console.log(app.get("env"));

app.get("/", (req, res, next) => {
  res.send("Hello world");
});

app.get("/err", (req, res, next) => {
  const err = new Error("DB cruched!");
  err.status = 500;
  next(err);
});

// if (process.env.NODE_ENV === "development") {
//   // only use in development
//   app.use(errorhandler({ log: errorNotification }));
// }

switch (app.get("env")) {
  case "development":
    // app.use(errorhandler({ log: false }));
    app.use(errorhandler({ log: errorNotification }));
    break;

  case "production":
    // prod code
    break;

  case "test":
    // test code
    break;

  default:
    console.log("Unknown environment");
    break;
}

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

/* eslint-disable-next-line */
function errorNotification(err, str, req) {
  const title = "Error in " + req.method + " " + req.url;

  notifier.notify({
    title: title,
    message: str
  });
}
