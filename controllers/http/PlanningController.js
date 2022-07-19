const db = require("../../services/database");
const fs = require("fs-extra");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Planning = db.Planning;
const User = db.User;
const Salle = db.Salle;
const Module = db.Module;
const getAll = async (req, res) => {
  const planning = await Planning.find();
  res.status(200).json(planning);
};

const remove = async (req, res) => {
  const planning = await Planning.findById(req.params.id);
  console.log(planning);
  if (!planning) {
    return res.status(404).json({
      status: 404,
      errorType: "PlanningNotFound",
      data: "Planning not found",
    });
  }
  await planning.remove();
  res.status(200).json(planning);
};

const create = async (req, res) => {
  const planning = new Planning();
  const salle = await Salle.findById(req.body.salle);
  const modules = await Module.findById(req.body.module);
  salle.isUse = true;
  await salle.save();
  let lesson = {
    Subject: modules.name + " - " + req.body.Subject + " - " + salle.name,
    StartTime: req.body.StartTime,
    EndTime: req.body.EndTime,
    Location: salle.name,
    PromoId: req.body.PromoId,
    TaskId: req.body.TaskId,
  };
  modules.lessons.push(lesson);
  await modules.save();

  planning.Subject =
    modules.name + " - " + req.body.Subject + " - " + salle.name;
  planning.StartTime = req.body.StartTime;
  planning.EndTime = req.body.EndTime;
  planning.Location = salle.name;
  planning.PromoId = req.body.PromoId;
  planning.TaskId = req.body.TaskId;

  await planning.save();

  res.status(200).json(planning);
};

module.exports = {
  getAll,
  create,
  remove,
};
