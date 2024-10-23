const express = require("express");
const router = express.Router();
const { loginUser, signUp, getAllUsers, updateUser } = require("../controllers/user.controller");
const {validateUser} = require("../utils/userValidator")
const {checkAdminAuth} = require("../utils/AdminAuthMiddleware")

router.post("/sign-up", validateUser, signUp);
router.post("/login", loginUser);
router.get("/getUsers", checkAdminAuth, getAllUsers)
router.post("/updateUser", checkAdminAuth, updateUser)

module.exports = router;
