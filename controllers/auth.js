const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { httpError, ctrlWrapper } = require("../helpers");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, "Email already in use");
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    id:newUser._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
  
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
    token
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw httpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({
    token,
  });
};
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};



