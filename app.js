const createError = require("http-errors"); //Create HTTP errors for Express, Koa, Connect, etc. with ease.
const express = require("express");
var cors = require("cors");
const path = require("path"); //nodejs
const cookieParser = require("cookie-parser"); //Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
const logger = require("morgan");
const methodOverride = require("method-override"); //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const categoryRouter = require("./app/category/router");
const dashboardRouter = require("./app/dashboard/router");
const nominalRouter = require("./app/nominal/router");
const voucherRouter = require("./app/voucher/router");
const bankRouter = require("./app/bank/router");
const paymentRouter = require("./app/payment/router");
const userRouter = require("./app/user/router");
const transactionRouter = require("./app/transaction/router");
const playerRouter = require("./app/player/router");
const authRouter = require("./app/auth/router");

const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const URL = `/api/v1`;

// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/adminlte", express.static(path.join(__dirname, "./node_modules/admin-lte/")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);
app.use(flash());

app.use("/", userRouter);
app.use("/dashboard", dashboardRouter);
app.use("/category", categoryRouter);
app.use("/nominal", nominalRouter);
app.use("/voucher", voucherRouter);
app.use("/bank", bankRouter);
app.use("/payment", paymentRouter);
app.use("/transaction", transactionRouter);
app.use("/auth", authRouter);

// api
app.use(`${URL}/players`, playerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
