const express = require("express")
const router = express.Router()
const {handleSystemRecepie,handleSystemRecepieById} = require("../controllers/systemRecepie")

router.route("/").get(handleSystemRecepie)
router.route("/:id").get(handleSystemRecepieById)


module.exports = router