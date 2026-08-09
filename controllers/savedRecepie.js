const savedRecepie = require("../models/savedRecepie")


/// get saved recepie
async function handleGetSavedRecepie(req,res){
    try {
        
        const items = await savedRecepie.find({user: req.user.id}).populate("recipeId")
        res.status(200).json(items)
    } catch (err) {
         console.log(err)
         res.status(500).json({err:"Internal server error"})
    }
}

//// create saved recepie
async function handleCreateSavedRecepie(req,res){
    try {
        const { recipeId , recipeType } = req.body

        const savedItem = await savedRecepie.create({
                user: req.user.id,
                recipeId,
                recipeType,
        })

     res.status(201).json({msg:"Item created",savedItem})

    } catch (err) {
        console.log(err)
        if(err.code === 11000){
            return res.status(409).json({msg:"This recipe already exist"})
        }
        
        res.status(500).json({msg:"Internal server error"})
    }
}

////delete saved recepie
async function handleDeleteSavedRecepie(req,res){
    try {
         const item = await savedRecepie.findOne({
            recipeId: req.params.id,
            user:req.user.id
         })
         if(!item){
            return res.status(404).json({msg:"Recepie not exist"})
         }

         if(item.user.toString() !== req.user.id.toString()){
            return res.status(403).json({msg:"You are not authorized to delete this recipe"})
         }

         await savedRecepie.findByIdAndDelete(item._id)
          res.status(200).json({msg:"Recepie delete successfully"})
    } catch (err) {
        console.log(err)
         res.status(500).json({msg:"Internal server error"})
    }
}

module.exports = {handleGetSavedRecepie, handleCreateSavedRecepie, handleDeleteSavedRecepie}