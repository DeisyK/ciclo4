const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const db = require("./config/keys").mongoURI;

app.use(morgan("dev"));

app.use(cors());

const router = require("./routes/index");

const port = 3030;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.use("/api", router);

app.set("port", process.env.PORT || port);

if (process.env.NODE_ENV !== "test") {
  app.listen(app.get("port"), () => {
    console.log("Server on port " + app.get("port") + " on dev");
  });
}

module.exports = app;
