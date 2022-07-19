const mongoose = require("mongoose");
const { Schema } = mongoose;
const { UserSchema } = require("./User");

// get object id
// const ObjectId = mongoose.Schema.Types.ObjectId;

const Project = new Schema(
  {
    name: String,
    description: String,
    users: [UserSchema],
    date: String,
    idModule: String,
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const model = mongoose.model("Project", Project);

module.exports = model;
