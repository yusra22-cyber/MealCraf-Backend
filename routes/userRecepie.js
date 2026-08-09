const express = require("express")
const router = express.Router()
const {verficationToken} = require("../middleware/authentication")
const {handleGetUserRecepie, handleGetUserRecepieById ,handleCreateUserRecepie, handleUpdateUserRecepieById, handleDeleteUserRecepieById} = require("../controllers/userRecepie") 

// gettting route
router.route("/").get(verficationToken, handleGetUserRecepie)
router.route("/:id").get(verficationToken, handleGetUserRecepieById)

////  ctreating  route
router.route("/").post(verficationToken, handleCreateUserRecepie)

/// update and delete route
router.route("/:id").patch(verficationToken, handleUpdateUserRecepieById).delete(verficationToken, handleDeleteUserRecepieById)


module.exports = router