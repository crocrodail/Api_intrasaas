const mongoose = require("mongoose");
const { Schema } = mongoose;
// get object id
// const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new Schema(
  {
    email: String,
    role: [{ type: String }],
    firstname: String,
    lastname: String,
    password: String,
    promo: String,
    spe: String,
    adress: String,
    city: String,
    country: String,
    phone: String,
    zipCode: String,
    imgProfil: String,
    notes: [],
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const model = mongoose.model("User", User);
User.index({ email: 1 });

module.exports = { User: model, UserSchema: User };
