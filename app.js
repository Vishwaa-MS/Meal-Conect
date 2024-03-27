const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");
const { notFound, errorHandler } = require("./middleware/errorHandler.js");
const donorRoutes = require("./routes/donor.js");
const beneficiaryRoutes = require("./routes/beneficiary.js");

const app = express();
dotenv.config();
connectDB();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/donor", donorRoutes);
app.use("/api/beneficiary", beneficiaryRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));
