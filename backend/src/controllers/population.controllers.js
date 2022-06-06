const express = require("express");

const Population = require("../models/population.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const datas = await Population.find().lean().exec();
    console.log(datas);
    return res.status(200).send(datas);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
router.post("", async (req, res) => {
    try{
        const product = await Population.create(req.body);
        return res.status(201).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})


module.exports = router;
