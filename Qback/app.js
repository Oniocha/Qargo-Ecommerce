const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appErrors");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

//import routes
const userAuthRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const tagRoutes = require("./routes/tagRoutes");
const productRoutes = require("./routes/productRoutes");
const raveRoutes = require("./routes/raveRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Global middlewares
// Setting security http
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limiting requests from the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(bodyParser.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against xss
app.use(xss());

// Preventing parameter polution
app.use(hpp());

app.use(cookieParser());
app.use(expressValidator());

// Allowing cross site requests
app.use(cors());

//routes middleware
app.use("/api/v1", userAuthRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", departmentRoutes);
app.use("/api/v1", tagRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", raveRoutes);
app.use("/api/v1", orderRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
