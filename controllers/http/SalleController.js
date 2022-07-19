const db = require("../../services/database");
const fs = require("fs-extra");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Salle = db.Salle;
const User = db.User;

const getAll = async (req, res) => {
  const salle = await Salle.find();
  res.status(200).json({
    status: 200,
    data: salle,
  });
};

const getNotUsed = async (req, res) => {
  const salle = await Salle.find();
  let response = [];
  for (let i in salle) {
    if (salle[i].isUse === false) {
      response.push({
        id: salle[i]._id,
        name: salle[i].name,
        isUse: salle[i].isUse,
        capacity: salle[i].capacity,
      });
    }
  }
  res.status(200).json({
    status: 200,
    data: response,
  });
};

const create = async (req, res) => {
  const salle = new Salle();
  salle.name = req.body.name;
  salle.isUse = req.body.isUse;
  salle.capacity = req.body.capacity;
  await salle.save();

  res.status(200).json({
    status: 200,
    data: salle,
  });
};

const remove = async (req, res) => {
  const salle = await Salle.findById(req.params.id);
  await salle.remove();
  res.status(200).json({
    status: 200,
    data: salle,
  });
};

module.exports = {
  getAll,
  create,
  getNotUsed,
  remove,
};
