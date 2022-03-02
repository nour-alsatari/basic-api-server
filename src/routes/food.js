"use strict";

const express = require("express");
const { food } = require("../models/index.js");
console.log(food);

const router = express.Router();

router.post("/food", createFood);
router.get("/food", getAllFood);
router.get("/food/:id", getOneDish);
router.put("/food/:id", updateDish);
router.delete("/food/:id", deleteDish);

async function createFood(req, res) {
  let newFood = req.body;
  console.log(req.body);
  let newFoodinDB = await food.create(newFood); // model.create({ dishName: "", MinutesToPrepare: "" })
  res.status(201).json(newFoodinDB);
}

async function getAllFood(req, res) {
  let allFood = await food.findAll();
  res.status(200).json(allFood);
}

async function getOneDish(req, res) {
  let fid = parseInt(req.params.id);
  let dish = await food.findOne({ where: { id: fid } });
  res.json(dish);
}

async function updateDish(req, res) {
  let fid = parseInt(req.params.id);
  let updatedDish = await food.update(req.body, { where: { id: fid } });
  let retrievedDish = await food.findOne({where:{id:fid}});
  res.status(201).json(retrievedDish);
}

async function deleteDish(req, res) {
  let fid = parseInt(req.params.id);
  let deleted = await food.destroy({
    where: {
      id: fid,
    },
  });

  deleted
  ? res.status(201).send("deleted successfully")
  : res.status(500).send("something went wrong");
}

module.exports = router;
