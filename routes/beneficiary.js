const express = require("express");
const router = express.Router();

const {
  beneficiaryLogin,
  beneficiarySignup,
} = require("../controllers/beneficiaryController");

router.post("/login", beneficiaryLogin);
router.post("/signup", beneficiarySignup);
