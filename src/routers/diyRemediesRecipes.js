
const express = require('express');
const router = new express.Router();

const DiyRemediesRecipes = require('../models/diyRemediesRecipes')



//Here we will handle post request for add Milestones
router.post("/diyRemediesRecipies", async (req,res)=>{
    try{
        const addingDiyRemediesRecipes = new DiyRemediesRecipes();
        addingDiyRemediesRecipes.imageUrl = req.body.imageUrl;
        addingDiyRemediesRecipes.title = req.body.title;
        addingDiyRemediesRecipes.description = req.body.description;
       

        try{
            const insertDiyRemediesRecipes = await addingDiyRemediesRecipes.save()
            console.log(insertDiyRemediesRecipes)
            res.status(201).send(insertDiyRemediesRecipes)
    
        }
        catch(e){
            console.log(e);
        }
    }catch(e){
        res.send(e)
    }
})
    //Here we handle the get Request for Milestones
    router.get("/getDiyRemediesRecipies", async (req,res)=>{
        try{
            let query = {};
            if (req.query.filter) {
              query.title = { $regex: req.query.filter, $options: "i" };
            }
                const getDiyRemediesRecipies = await DiyRemediesRecipes.find({query})
                res.send(getDiyRemediesRecipies)
        }catch(e){
            res.send(e)
        }
    })

    //Here we handle the get Request for a specific Milestone
    router.get("/getDiyRemediesRecipies/:id", async (req,res)=>{
    try{
            const _id = req.params.id
            const getDiyRemedeyRecipe = await DiyRemediesRecipes.find({_id})
            res.send(getDiyRemedeyRecipe)
    }catch(e){
        res.send(e)
    }
})

//Here we handle the patch request for Milestone
   
    router.patch("/updatediyRemediesRecipies/:id", async (req,res)=>{
    try{
                const _id = req.params.id
                const updateDiyRemedeyRecipe = await DiyRemediesRecipes.findByIdAndUpdate({_id} ,req.body,{new:true})
                res.send(updateDiyRemedeyRecipe)
    }catch(e){
            res.send(e)
    }
})

    router.delete("/diyRemediesRecipies/:id", async (req,res)=>{
    try{
            const deleteDiyRemedeyRecipe = await DiyRemediesRecipes.findByIdAndDelete(req.params.id)
            res.send(deleteDiyRemedeyRecipe)
    }catch(e){
        res.send(e)
    }
})

module.exports = router;
