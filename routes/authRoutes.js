const express = require("express");

const {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateProfile,
    changePassword
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
console.log(authMiddleware);
const router = express.Router();

// Regiter Route
router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile",authMiddleware,updateProfile)
router.put("/change-password", authMiddleware, changePassword );
module.exports = router;


// GET /api/auth/profile
/*{
  "success": true,
  "user": {
    "_id": "66b7cde12345abc987654321",
    "name": "John",
    "email": "john@gmail.com",
    "role": "user"
  }
}*/