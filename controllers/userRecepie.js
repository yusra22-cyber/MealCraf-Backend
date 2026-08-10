require("dotenv").config()
const mongoose = require('mongoose')
const userRecepie = require("../models/userRecepie")
const systemRecepie = require("../models/systemRecepie")
const axios = require("axios")
// get all
async function handleGetUserRecepie(req,res){
    try {

        const recepies = await userRecepie.find({ isPublic: true })
        return res.status(200).json(recepies)
       
    } catch (err) {
        console.log(err)
        res.status(500).json({err:"Internal server error"})
    }
}
 
// by id get

async function handleGetUserRecepieById (req,res){
    try {
        
        const recepie = await userRecepie.findById(req.params.id)
        if(!recepie){
            return res.status(404).json({msg:"Recepie not found"})
        }
        return res.status(200).json(recepie)

    } catch (err) {
        console.log(err)
        res.status(500).json({err:"Internal server error"})
    }
}


// create the data using post

async function handleCreateUserRecepie(req,res){
    try {
        const {title} = req.body
        const recepie = await systemRecepie.findOne({title})

        if(recepie){
            return res.status(409).json({msg:"Already recepie exist"})
        }

        const newRecepie = await userRecepie.create({
            ...req.body,
            createdBY:req.user.id
        })

        return res.status(201).json(newRecepie)
    } catch (err) {
        console.log(err)
        res.status(500).json({err:"Internal server error"})
    }
}

/// update by id using patch

async function handleUpdateUserRecepieById(req,res){
    try {

        const recepie = await userRecepie.findById(req.params.id)

        if(!recepie){
            return res.status(404).json({msg:"Recepie not found"})
        }

        if(recepie.createdBY.toString() !== req.user.id.toString()){
            return res.status(403).json({msg:"Your are not authorized to edit this recepie"})
        }

        const newRecepie = await userRecepie.findByIdAndUpdate(req.params.id, req.body,{returnDocument:"after"})
        res.status(201).json(newRecepie)

    } catch (err) {
        console.log(err)
        res.status(500).json({err:"Internal server error"})
    }
}

///// delete by id using delete

async function handleDeleteUserRecepieById(req,res){
    try {
 
        const recepie = await userRecepie.findById(req.params.id)

        if(!recepie){
            return res.status(404).json({msg:"Recepie not found"})
        }

        if(recepie.createdBY.toString() !== req.user.id.toString()){
            return res.status(403).json({msg:"Your are not authorized to delete this recepie"})
        }

     await userRecepie.findByIdAndDelete(req.params.id)
        res.status(201).json({msg:"Recipe removed successfuly"})
        
    } catch (err) {
        console.log(err)
        res.status(500).json({err:"Internal server error"})
    }
}

module.exports = {handleGetUserRecepie, handleGetUserRecepieById ,handleCreateUserRecepie, handleUpdateUserRecepieById, handleDeleteUserRecepieById }