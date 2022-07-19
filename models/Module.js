const mongoose = require("mongoose");
const { Schema } = mongoose;
const { UserSchema } = require("./User");
// get object id
// const ObjectId = mongoose.Schema.Types.ObjectId;

const Module = new Schema(
  {
    name: String,
    project: [
      {
        name: String,
        description: String,
        users: [UserSchema],
        idModule: String,
        date: String,
      },
    ],
    lessons: [
      {
        Subject: String,
        StartTime: String,
        EndTime: String,
        Location: String,
        PromoId: Number,
        TaskId: Number,
      },
    ],
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const model = mongoose.model("Module", Module);

module.exports = model;
