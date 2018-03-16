const express = require("express");
const pug = require("pug");
const path = require("path");
const fs = require("fs");
const helpers = require("./helpers");

const app = express();

// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.currentPath = req.path;
  next();
});

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile("server.log", `${log} \n`, err => {
    if (err) {
      console.log("Unable to append to server.lg");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintainance");
// });

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
    welcomeMsg: "Welcome to my Website"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to show page"
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
