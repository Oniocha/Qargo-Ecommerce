const express = require("express");
const mongoose = require("mongoose");
// load env variables
require("dotenv").config();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");

//import routes
const userAuthRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const tagRoutes = require("./routes/tagRoutes");
const productRoutes = require("./routes/productRoutes");
const raveRoutes = require("./routes/raveRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//middlewares
app.use(morgan("dev"));
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

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
