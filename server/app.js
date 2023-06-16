var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var usersRouter = require("./routes/users");
var propertiesRouter = require("./routes/properties");
var adminRouter = require("./routes/admin");
var bidsRouter = require("./routes/bids");

var app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/properties", propertiesRouter);
app.use("/admin", adminRouter);
app.use("/bids", bidsRouter);

module.exports = app;
