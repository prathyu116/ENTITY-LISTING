const express = require("express");
const cors = require("cors");
const populationController = require("./controllers/population.controllers");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/population", populationController); 


module.exports = app;
