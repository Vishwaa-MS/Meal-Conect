const asyncHandler = require("express-async-handler");
const Beneficiary = require("../models/beneficiaryModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");

//LOGIN CONTROLLER
const beneficiaryLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const beneficiary = await Beneficiary.findOne({ email });
    if (!beneficiary) {
      const error = new Error(
        "A beneficiary with this email could not be found."
      );
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
      _id: beneficiary._id,
      name: beneficiary.name,
      email: beneficiary.email,
      pic: beneficiary.pic,
      token: generateToken(beneficiary._id),
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
const beneficiarySignup = asyncHandler(async (req, res, next) => {
  const { name, email, password, address, contact } = req.body;
  if (!name || !email || !password || !address || !contact) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  const beneficiaryExist = await Beneficiary.findOne({ email });
  if (beneficiaryExist) {
    res.status(400);
    throw new Error("Beneficiary already exists");
  }
  try {
    const hashPw = await bcrypt.hash(password, 12);
    const beneficiary = new Beneficiary({
      name: name,
      email: email,
      password: hashPw,
      address: address,
      contact: contact,
    });
    const result = await beneficiary.save();
    res.status(201).json({
      _id: result._id,
      name: result.name,
      email: result.email,
      pic: result.pic,
      token: generateToken(result._id),
      message: "Beneficiary Created!",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

module.exports = { beneficiarySignup, beneficiaryLogin };
