const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/users.controller");
const { Auth } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", Auth, getUser);

module.exports = router;
