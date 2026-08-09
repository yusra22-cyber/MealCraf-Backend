const express = require("express")
const router = express.Router()
const {verficationToken} = require("../middleware/authentication")
const {handleLogin, handleRegister, handleLogout, handleUser} = require("../controllers/authController")

router.route("/login").post(handleLogin)
router.route("/register").post(handleRegister)
router.route("/logout").post(handleLogout)
router.route("/me").get(verficationToken, handleUser)

module.exports = router