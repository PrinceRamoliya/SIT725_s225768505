const express = require("express");
const path = require("path");
const { calculateSum } = require("./calculator");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/add", (req, res) => {
  try {
    const result = calculateSum(req.query.a, req.query.b);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/add", (req, res) => {
  try {
    const result = calculateSum(req.query.a, req.query.b);
    res.send(`The sum of ${Number(req.query.a)} and ${Number(req.query.b)} is: ${result}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = app;
