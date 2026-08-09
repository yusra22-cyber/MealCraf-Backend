const express = require("express")
const router = express.Router()
const {verficationToken} = require("../middleware/authentication")
const {handleGetPantryItem, handleCreatePantryItem, handleUpadatePantryItems, handleDeletePantryItem} = require("../controllers/pantryItems")

router.route("/").get(verficationToken, handleGetPantryItem).post(verficationToken, handleCreatePantryItem)
router.route("/:id").patch(verficationToken, handleUpadatePantryItems).delete(verficationToken, handleDeletePantryItem)

module.exports = router