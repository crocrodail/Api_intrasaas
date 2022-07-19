const db = require("../../services/database");
const fs = require("fs-extra");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Module = db.Module;
const User = db.User;

const getAll = async (req, res) => {
  const modules = await Module.find();
  res.status(200).json({
    status: 200,
    data: modules,
  });
};

const getOne = async (req, res) => {
  const modules = await Module.findById(req.params.id);

  res.status(200).json({
    status: 200,
    data: modules,
  });
};

const create = async (req, res) => {
  const modules = new Module();
  modules.name = req.body.name;
  await modules.save();

  res.status(200).json({
    status: 200,
    data: modules,
  });
};

const remove = async (req, res) => {
  const modules = await Module.findById(req.params.id);
  await modules.remove();
  res.status(200).json({
    status: 200,
    data: modules,
  });
};

module.exports = {
  getAll,
  create,
  getOne,
  remove,
};
