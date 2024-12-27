const express = require("express");
const {
  registerUser,
  loginUser,
  addFriend,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/add-friend", addFriend);

module.exports = router;
