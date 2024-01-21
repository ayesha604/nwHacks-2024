const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

const app = express();

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongdodb connected");
  })
  .catch((err) => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8800, () => {
  console.log("backend server is running");
});
