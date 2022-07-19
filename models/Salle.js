const mongoose = require("mongoose");
const { Schema } = mongoose;
// get object id
// const ObjectId = mongoose.Schema.Types.ObjectId;

const Salle = new Schema(
  {
    name: String,
    isUse: Boolean,
    capacity: String,
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const model = mongoose.model("Salle", Salle);

module.exports = model;
