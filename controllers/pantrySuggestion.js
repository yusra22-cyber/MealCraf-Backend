const systemRecepie = require("../models/systemRecepie")
const pantryItem = require("../models/pantryItem")

async function handlePantrySuggestion(req,res){
    try {
        
        const user = await pantryItem.find({user:req.user.id})
        const ingedients= user.map(item=>item.ingredientName.toLowerCase())
        const systemIngredients = await systemRecepie.find({}).select("title category ingredients")

        
        const systemItems = systemIngredients.map(item=>{

            ////  matched item
         const  matched =  item.ingredients.filter(i=>
                (ingedients.includes(i.ingredientName.toLowerCase()))).map(i=>i.ingredientName)
            ////  missing items
         const missedIngredients = item.ingredients.filter(i=>
            (!ingedients.includes(i.ingredientName.toLowerCase()))).map(i=>i.ingredientName)
                return{
                    _id: item._id,
                    title:item.title,
                    category:item.category,
                    matchedIngredients:matched,
                    missingIngredients:missedIngredients,
                    totalMatched: matched.length,
                    totalIngrdients:item.ingredients.length,
                }}).filter(recepie=>recepie.totalMatched>0)
        

        
        
        return res.json({msg:"Sugested recepies",systemItems,totalPantry:ingedients.length})

    } catch (err) {
        console.log(err)
        res.status(500).json({err:"Internal server error"})
    }
}

module.exports = {handlePantrySuggestion}