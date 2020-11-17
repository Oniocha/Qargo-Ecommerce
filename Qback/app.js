const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
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

//middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
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
