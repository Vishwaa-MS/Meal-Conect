const asyncHandler = require("express-async-handler");
const Donor = require("../models/donorModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");

//LOGIN CONTROLLER
const donorLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const donor = await Donor.findOne({ email });
    if (!donor) {
      const error = new Error("A donor with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, donor.password);
    if (!isEqual) {
      const error = new Error("Wrong Password, Enter the correct password");
      error.statusCode = 401;
      throw error;
    }
    res.status(201).json({
      _id: donor._id,
      name: donor.name,
      email: donor.email,
      pic: donor.pic,
      token: generateToken(donor._id),
      message: "login successful",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//SIGNUP CONTROLLER
const donorSignup = asyncHandler(async (req, res, next) => {
  const { name, type, email, password, address, contact } = req.body;
  if (!name || !type || !email || !password || !address || !contact) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  const donorExist = await Donor.findOne({ email });
  if (donorExist) {
    res.status(400);
    throw new Error("Donor already exists");
  }
  try {
    const hashPw = await bcrypt.hash(password, 12);
    const donor = new Donor({
      name: name,
      type: type,
      email: email,
      password: hashPw,
      address: address,
      contact: contact,
    });
    const result = await donor.save();
    res.status(201).json({
      _id: result._id,
      name: result.name,
      email: result.email,
      pic: result.pic,
      token: generateToken(result._id),
      message: "Donor Created!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

module.exports = { donorSignup, donorLogin };
