const mongoose = require("mongoose");

const populationSchema = new mongoose.Schema(
  {
      id:{type:Number},
    country: { type: String, required: true },
    city: { type: String, required: true },
    population: { type: Number, required: true }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("data", populationSchema);
