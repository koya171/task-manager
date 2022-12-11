const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const mongoose = require("mongoose");
const notFound = require("./middleware/NotFound");
const errorHandlerMiddleware = require('./middleware/error-handler')

const bodyParser = require("body-parser");
const tasks = require("./routes/Task");
mongoose.set("strictQuery", true);
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'))
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.mongo_Uri);
    app.listen(port, () => {
      console.log(`server listing ${port} port`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
