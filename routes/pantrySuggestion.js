const express = require("express")
const router = express.Router()

const {verficationToken} = require("../middleware/authentication")
const {handlePantrySuggestion} = require("../controllers/pantrySuggestion")

router.route("/").get(verficationToken, handlePantrySuggestion)

module.exports = router