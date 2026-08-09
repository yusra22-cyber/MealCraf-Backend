const express = require("express")
const router = express.Router()

const {verficationToken} = require("../middleware/authentication")
const {handleGetSavedRecepie, handleCreateSavedRecepie, handleDeleteSavedRecepie} = require("../controllers/savedRecepie")

router.route("/").get(verficationToken, handleGetSavedRecepie).post(verficationToken, handleCreateSavedRecepie)
router.route("/:id").delete(verficationToken, handleDeleteSavedRecepie)

module.exports = router