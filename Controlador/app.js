const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const router = require("./routes/index");

const port = 3030;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", router);

app.set("port", process.env.PORT || port);

if (process.env.NODE_ENV !== "test") {
  app.listen(app.get("port"), () => {
    console.log("Server on port " + app.get("port") + " on dev");
  });
}

module.exports = app;
