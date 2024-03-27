const express = require("express");
const router = express.Router();

const { donorLogin, donorSignup } = require("../controllers/donorController");

router.post("/login", donorLogin);
router.post("/signup", donorSignup);
