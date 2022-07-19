const mongoose = require("mongoose");
const { User } = require("./../models/User");

const connectionsString =
  process.env.MONGO_URL ||
  "mongodb+srv://Nathan:nathan72@cluster0.jaouj.mongodb.net/intrasaas?retryWrites=true&w=majority";

mongoose.connect(connectionsString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var db = mongoose.connection;
db.on("error", function (e) {
  console.log("bad to MongoDB", e);
});
db.once("open", function () {
  console.log("Connected to MongoDB");
});

mongoose.Promise = global.Promise;

module.exports = {
  User,
  Planning: require("./../models/Planning.js"),
  Salle: require("./../models/Salle.js"),
  Module: require("./../models/Module.js"),
  Project: require("./../models/Project.js"),
};
