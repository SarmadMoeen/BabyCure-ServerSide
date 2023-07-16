
const express = require('express');
const router = new express.Router();

const DietPlan = require('../models/dietPlan')
const Category = require('../models/Category')


//Here we will handle post request for add Diet Plans
router.post("/dietPlan", async (req,res)=>{
    try{
        const addingDietPlan = new DietPlan(req.body)
        console.log(req.body)

        try{
            const insertDietPlan = await addingDietPlan.save()
            res.status(201).send(insertDietPlan)
    
        }
        catch(e){
            console.log(e);
        }
    }catch(e){
        res.send(e)
    }
})
    //Here we handle the get Request for Diet Plans
    /*router.get("/getDietPlan", async (req,res)=>{
        try{
            console.log('diet plans')
                const getDietPlans= await DietPlan.find({})

                const categires = await Category.Category.find({})
            /*
                Category.getCategories().then((data)=>{


                })
                */
               /*const plans = {
                DietPlans:getDietPlans,
                categires:categires
               }
                res.status(200).send({plans})
        }catch(e){
            res.send(e)
        }
    })*/

    router.get("/getDietPlan", async (req,res)=>{
        try{

                const babyAge =req.query.babyAge;
                const getDietPlan = await DietPlan.find({babyAge:babyAge})
                res.send(getDietPlan)
        }catch(e){
            res.send(e)
        }
    })

    //Here we handle the get Request for a specific Diet Plans
    router.get("/getDietPlan/:id", async (req,res)=>{
    try{
            const _id = req.params.id
            const getDietPlan= await DietPlan.find({_id})
            res.send(getDietPlan)
    }catch(e){
        res.send(e)
    }
})

//Here we handle the patch request for Diet Plans
   
    router.patch("/updateDietPlan/:id", async (req,res)=>{
    try{
                const _id = req.params.id
                const updateDietPlan= await DietPlan.findByIdAndUpdate({_id} ,req.body,{new:true})
                res.send(updateDietPlan)
    }catch(e){
            res.send(e)
    }
})

    router.delete("/deleteDietPlan/:id", async (req,res)=>{
    try{
            const deleteDietPlan= await DietPlan.findByIdAndDelete(req.params.id)
            res.send(deleteDietPlan)
    }catch(e){
        res.send(e)
    }
})

module.exports = router;
