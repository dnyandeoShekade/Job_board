const express = require ("express");

const {registerUser, loginUser} = require("../controllers/authController");

const router = express.Router();

// Regiter Route
router.post("/register",registerUser);

router.post("/login",loginUser);

module.exports = router;