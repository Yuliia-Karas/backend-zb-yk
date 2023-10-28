const bcryptjs = require('bcryptjs');

const { User } = require("../models/user");
const { httpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email,password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, "Email already in use");
  }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
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
    const token = "dsfsdf";
    
    res.json({
        token,
    })
}
module.exports = {
    register: ctrlWrapper(register),
    login:ctrlWrapper(login),
};



// const jwt = require("jsonwebtoken");
// const gravatar = require("gravatar");
// const path = require("path");
// const fs = require("fs/promises");
// const Jimp = require("jimp");
// // const nanoid  = import("nanoid");
// const { nanoid } = require("nanoid");

// const { ctrlWrapper, HttpError, sendEmail } = require("../helpers");
// const { SECRET_KEY, BASE_URL } = process.env;
// const avatarsDir = path.join(__dirname, "../", "public", "avatars");

//   const avatarURL = gravatar.url(email);

//   // const verificationToken =  (await nanoid).nanoid();
//   const verificationToken = nanoid();

//   const newUser = await User.create({
//     ...req.body,
//     password: hashPassword,
//     avatarURL,
//     verificationToken,
//   });

//   const verifyEmail = {
//     to: email,
//     subject: "Verify your email",
//     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`,
//   };
//   await sendEmail(verifyEmail);

//   res.status(201).json({
//     password: newUser.password,
//     email: newUser.email,
//   });
// };

// const verifyEmail = async (req, res) => {
//   const { verificationToken } = req.params;
//   console.log(verificationToken);
//   const user = await User.findOne({ verificationToken });
//   if (!user) {
//     throw HttpError(404, "User not found");
//   }
//   await User.findByIdAndUpdate(user._id, {
//     verify: true,
//     verificationToken: "",
//   });

//   return res.status(200).json({
//     message: "Verification successful",
//   });
// };

// const resendVerifyEmail = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw HttpError(400, "missing required field email");
//   }
//   if (user.verify) {
//     throw HttpError(400, "Verification has already been passed");
//   }
//   const verifyEmail = {
//     to: email,
//     subject: "Verify your email",
//     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`,
//   };
//   await sendEmail(verifyEmail);

//   return res.status(200).json({
//     message: "Verification email sent",
//   });
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw HttpError(401, "Email or password is wrong");
//   }

//   if (!user.verify) {
//     throw HttpError(404, "User not found");
//   }
//   const passwordCompare = await bcrypt.compare(password, user.password);
//   if (!passwordCompare) {
//     throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");
//   }

//   const payload = {
//     id: user._id,
//   };

//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
//   await User.findByIdAndUpdate(user._id, { token });

//   res.json({
//     token,
//   });
// };

// const getCurrent = async (req, res) => {
//   const { email, subscription } = req.user;

//   res.json({
//     email,
//     subscription,
//   });
// };

// const logout = async (req, res) => {
//   const { _id } = req.user;
//   await User.findByIdAndUpdate(_id, { token: "" });

//   res.json({
//     message: "Logout success",
//   });
// };

// const updateUserSubscription = async (req, res) => {
//   const { subscription } = req.body;
//   const { id } = req.user;
//   try {
//     if (["starter", "pro", "business"].includes(subscription)) {
//       const updatedUser = await User.findByIdAndUpdate(
//         id,
//         { subscription },
//         { new: true }
//       );

//       res.json(updatedUser);
//     } else {
//       res.status(400).json({ message: "Invalid subscription value" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating subscription", error: error.message });
//   }
// };

// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;
//   const { path: tempUpload, originalname } = req.file;
//   const filename = `${_id}_${originalname}`;
//   const resultUpload = path.join(avatarsDir, filename);
//   await fs.rename(tempUpload, resultUpload);

//   try {
//     const image = await Jimp.read(resultUpload);
//     image.resize(250, 250);
//     image.write(resultUpload);
//   } catch {
//     throw HttpError(500, "Internal Server Error");
//   }

//   const avatarURL = path.join("avatars", filename);
//   await User.findByIdAndUpdate(_id, { avatarURL });

//   res.json({
//     avatarURL,
//   });
// };

// module.exports = {
//   register: ctrlWrapper(register),
//   verifyEmail: ctrlWrapper(verifyEmail),
//   resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
//   login: ctrlWrapper(login),
//   getCurrent: ctrlWrapper(getCurrent),
//   logout: ctrlWrapper(logout),
//   updateUserSubscription: ctrlWrapper(updateUserSubscription),
//   updateAvatar: ctrlWrapper(updateAvatar),
// };
