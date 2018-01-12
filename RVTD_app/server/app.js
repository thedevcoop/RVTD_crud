const express = require("express");
const bodyParser = require("body-parser");
const qry = require("./routes/qry");
const routing = require("./routes/routing");

const app = express();

app.use(bodyParser.json());
app.use("/people", qry);
app.use("/", routing);

app.use((err, req, res, next) => {
  res.json(err);
});

module.exports = app;
