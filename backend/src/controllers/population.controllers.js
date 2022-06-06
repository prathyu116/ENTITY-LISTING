const express = require("express");

const Population = require("../models/population.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 5;

    const skip = (page - 1) * pagesize;

    const datas = await Population.find().skip(skip).limit(pagesize).lean().exec();
    const totalPages = Math.ceil((await Population.find().countDocuments()) / pagesize);
    // console.log(totalPages);
    return res.status(200).send({datas,totalPages});
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
router.post("", async (req, res) => {
  try {
    const product = await Population.create(req.body);
    return res.status(201).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = router;
