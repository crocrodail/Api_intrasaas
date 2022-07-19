const db = require("../../services/database");
const User = db.User;

const lang = async (req, res) => {
  const user = await User.findOne({ email: req.auth.identity });
  await user.save();
  const { password, ...userWithoutHash } = user.toObject();
  res.status(200).json({
    status: 200,
    data: userWithoutHash,
  });
};

const info = async (req, res) => {
  const user = await User.findOne({ email: req.auth.identity });
  const { password, ...userWithoutHash } = user.toObject();
  res.status(200).json({
    status: 200,
    data: userWithoutHash,
  });
};

module.exports = {
  lang,
  info,
};
