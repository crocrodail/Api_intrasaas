const db = require("../../services/database");
const nodeDiskInfo = require("node-disk-info");
const User = db.User;

const users = async (_req, res) => {
  const allUsers = await User.find({}).select("-password");
  res.status(200).json({
    status: 200,
    data: allUsers,
  });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: 200,
    data: user,
  });
};

const getIntervenant = async (req, res) => {
  const user = await User.find();
  let response = [];
  for (i in user) {
    if (user[i].role[0] === "Intervenant") {
      response.push({
        id: user[i]._id,
        firstname: user[i].firstname,
        lastname: user[i].lastname,
      });
    }
  }
  res.status(200).json({
    status: 200,
    data: response,
  });
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.promo = req.body.promo;
  user.spe = req.body.spe;
  user.adress = req.body.adress;
  user.city = req.body.city;
  user.country = req.body.country;
  user.phone = req.body.phone;
  user.zipCode = req.body.zipCode;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.imgProfil = req.body.imgProfil;
  user.role = [req.body.role];
  await user.save();
  res.status(200).json({
    status: 200,
    data: user,
  });
};

module.exports = {
  users,
  updateUser,
  getUser,
  getIntervenant,
};
