require("dotenv").config()
const mongoose = require('mongoose')
const systemRecepie = require("../models/systemRecepie")
const axios = require("axios")


async function handleSystemRecepie(req,res){
       try {
           
        const recepies = await systemRecepie.find({})
        return res.status(200).json(recepies)
           
       } catch (err) {
        console.log(err)
          res.status(500).json({err:"Internal server error"})
       }
}



async function handleSystemRecepieById(req,res){
    try {
        const recepie = await systemRecepie.findById(req.params.id)
        if(!recepie){
            return res.status(404).json({msg:"Recepie not found"})
        }
         res.status(200).json(recepie)
    } catch (err) {
        console.log(err)
         res.status(500).json({err:"Internal server error"})
    }
}

module.exports = {handleSystemRecepie,handleSystemRecepieById}