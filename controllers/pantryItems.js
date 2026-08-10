const pantryItem = require("../models/pantryItem")


/// get pantry items
async function handleGetPantryItem(req,res){
    try {
        const items = await pantryItem.find({user:req.user.id})
        res.status(200).json(items)    
    } catch (err) {
        console.log(err)
        res.status(500).json({err:"Internal server error"})
    }
}

/// create pantry items

async function handleCreatePantryItem(req,res){
    try {    

        const {ingredientName} = req.body
        const item = await pantryItem.findOne({
            ingredientName,
            user: req.user.id
        })
        if(item){
            return res.status(409).json({msg:"Already ingredient exist"})
        }

        const newItem = await pantryItem.create({
            ...req.body,
            user:req.user.id
        })
        return res.status(201).json(newItem)
    } catch (err) {
        console.log(err)
        if(err.code === 11000){
            return res.status(409).json({msg:"These ingedients already exist"})
        }
     return res.status(500).json({err:"Internal server error"})
    }
}

/// update pantry items

async function handleUpadatePantryItems(req,res){
    try {
        const item = await pantryItem.findById(req.params.id)
        if(!item){
            return res.status(404).json({msg:"Item not found"})
        }

        if(item.user.toString() !== req.user.id.toString()){
            return res.status(403).json({msg:"You are not authorized to edit this item"})
        }

        const newItem = await pantryItem.findByIdAndUpdate(req.params.id, req.body, {returnDocument:"after"})
        res.status(201).json(newItem)

    } catch (err) {
      console.log(err)
      res.status(500).json({err:"Internal server error"})   
    }
}

//// delete pantry items

async function handleDeletePantryItem(req,res){
    try {
        const item = await pantryItem.findById(req.params.id)

        if(!item){
            return res.status(404).json({msg:"Item not found"})
        }

        if(item.user.toString() !== req.user.id.toString()){
            return res.status(409).json({msg:"You are not authorized to delete this item"})
        }

        await pantryItem.findByIdAndDelete(req.params.id)
         res.status(200).json({msg:"Item delete successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json({err:"Internal server error"})
    }
}

module.exports = {handleGetPantryItem, handleCreatePantryItem, handleUpadatePantryItems, handleDeletePantryItem}