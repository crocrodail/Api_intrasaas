const db = require("../../services/database");
const fs = require("fs-extra");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Module = db.Module;
const Project = db.Project;
const User = db.User;

const create = async (req, res) => {
  const modules = await Module.findById(req.params.id);
  // const users = await User.find(({ role }) => role.find("Etudiant"));
  const users = await User.find({ role: "Etudiant" });
  let project = {
    name: req.body.name,
    description: req.body.description,
    users: users,
    date: req.body.date,
    idModule: req.params.id,
  };
  modules.project.push(project);
  await modules.save();
  res.status(200).json({
    status: 200,
    data: modules,
  });
};

// const addNote = async (req, res) => {
//   const modules = await Module.findById(req.params.id);
//   const student = await User.findById(req.params.iduser);
//   let project = modules.project.id(req.params.idproject);
//   // const user = project.users._id(req.params.iduser);
//   console.log(project.users);
//   let note = {
//     name: project.name,
//     commentaire: req.body.commentaire,
//     note: req.body.note,
//     date: new Date(),
//   };
//   for (i in project.users) {
//     if (project.users[i]._id === req.params.iduser) {
//       project.users[i].notes.push(note);
//     }
//   }
// let user = project.users.id(req.params.iduser);
// let user = project.users.id({
//   _id: mongoose.mongo.ObjectId(req.params.iduser),
// });
const addNote = async (req, res) => {
  const modules = await Module.findById(req.params.id);
  const student = await User.findById(req.params.iduser);
  let project = modules.project.id(req.params.idproject);

  console.log(req.params.idproject, project);

  let user = project.users.id(req.params.iduser);

  let note = {
    name: project.name,
    commentaire: req.body.commentaire,
    note: req.body.note,
    date: new Date(),
    idProject: req.params.idproject,
  };

  if (user.notes.find(({ idProject }) => idProject === req.params.idproject)) {
    //if there is already a note with the same projectid then replace
    const userNoteIndex = user.notes.findIndex(
      ({ idProject }) => idProject === req.params.idproject
    );
    // delete user.notes[userNoteIndex];
    user.notes.splice(userNoteIndex, 1);

    const studentNoteIndex = student.notes.findIndex(
      ({ idProject }) => idProject === req.params.idproject
    );
    // delete student.notes[studentNoteIndex];
    student.notes.splice(studentNoteIndex, 1);
  }

  user.notes.push(note);
  student.notes.push(note);

  await student.save();
  await modules.save();

  res.status(200).json({
    status: 200,
    data: project,
  });
};
// user.notes.push(note);
//   await modules.save();
//   student.notes.push(note);
//   await student.save();
//   res.status(200).json({
//     status: 200,
//     data: project,
//   });
// };

const getOne = async (req, res) => {
  const modules = await Module.findById(req.params.id);
  let project = modules.project.id(req.params.idproject);
  res.status(200).json({
    status: 200,
    data: project,
  });
};

const getAll = async (req, res) => {
  // get all project of a modules
  const modules = await Module.find();
  let projects = [];
  for (i in modules) {
    for (j in modules[i].project) {
      projects.push(modules[i].project[j]);
    }
  }
  res.status(200).json({
    status: 200,
    data: projects,
  });
};

const remove = async (req, res) => {
  const modules = await Module.findById(req.params.id);
  let project = modules.project.id(req.params.idproject);
  project.remove();
  await modules.save();
  res.status(200).json({
    status: 200,
    data: project,
  });
};

const update = async (req, res) => {
  const modules = await Module.findById(req.params.id);
  let project = modules.project.id(req.params.idproject);
  project.name = req.body.name;
  project.description = req.body.description;
  await modules.save();
  res.status(200).json({
    status: 200,
    data: project,
  });
};

module.exports = {
  create,
  getOne,
  remove,
  update,
  addNote,
  getAll,
};
