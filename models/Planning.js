const mongoose = require("mongoose");
const { Schema } = mongoose;
// get object id
// const ObjectId = mongoose.Schema.Types.ObjectId;

const Planning = new Schema(
  {
    Subject: String,
    StartTime: String,
    EndTime: String,
    Location: String,
    PromoId: Number,
    TaskId: Number,
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const model = mongoose.model("Planning", Planning);

module.exports = model;
