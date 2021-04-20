var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");

//connect to questionnaire db using mongoose
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/questionnaire", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});
//connect to questionnaire db using mongoose

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testApiRouter = require("./routes/testApi");
var user = require("./routes/usersList/usersList"); //import user management api & model
var auth = require("./routes/usersList/login"); //import authentication api & model

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser.json()); // for parsing application/json
app.use(cors()); // for cors disabling
app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/testApi", testApiRouter);
app.use("/user", user); //user management api
app.use("/auth", auth); //authentication api

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
