const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  console.log("Inside register function");
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("Account already exist!!! Please Login");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        github: "",
        linkedin: "",
        profilePic: "",
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.loginController = async (req, res) => {
  console.log("inside login function");
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_PASSWORD
      );
      res.status(200).json({ user: existingUser, token });
    } else {
      res.status(404).json("Invalid Email/Password...");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.editProfileController = async (req, res) => {
  console.log("inside edit function");
  const { username, email, password, github, linkedin, profilePic } = req.body;
  const uploadImg = req.file ? req.file.filename : profilePic;
  const userId = req.payload;
  try {
    const updatedUser = await users.findByIdAndUpdate(
      { _id: userId },
      { username, email, password, github, linkedin, profilePic: uploadImg },
      { new: true }
    );
    console.log(updatedUser);
    await updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(401).json(err);
  }
};

// res.status(200).send(`<h1>Project Manager started and awaited </h1>`)
