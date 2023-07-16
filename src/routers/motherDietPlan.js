
const express = require('express');
const router = new express.Router();

const MotherDietPlan = require('../models/motherDietPlan')



//Here we will handle post request for add Milestones
router.post("/motherDietPlan", async (req,res)=>{
    try{
        const addingMotherDietPlan = new MotherDietPlan(req.body)
        console.log(req.body)

        try{
            const insertMotherDietPlan = await addingMotherDietPlan.save()
            res.status(201).send(insertMotherDietPlan)
    
        }
        catch(e){
            console.log(e);
        }
    }catch(e){
        res.send(e)
    }
})
    //Here we handle the get Request for Milestones
    router.get("/getMotherDietPlan", async (req,res)=>{
        try{
                const getMotherDietPlan = await MotherDietPlan.find({})
                res.send(getMotherDietPlan)
        }catch(e){
            res.send(e)
        }
    })

    //Here we handle the get Request for a specific Milestone
    router.get("/getMotherDietPlan/:id", async (req,res)=>{
    try{
            const _id = req.params.id
            const getMotherDietPlan = await MotherDietPlan.find({_id})
            res.send(getMotherDietPlan)
    }catch(e){
        res.send(e)
    }
})

//Here we handle the patch request for Milestone
   
    router.patch("/updateMotherDietPlan/:id", async (req,res)=>{
    try{
                const _id = req.params.id
                const updateMotherDietPlan = await MotherDietPlan.findByIdAndUpdate({_id} ,req.body,{new:true})
                res.send(updateMotherDietPlan)
    }catch(e){
            res.send(e)
    }
})

    router.delete("/deleteMotherDietPlan/:id", async (req,res)=>{
    try{
            const deleteMotherDietPlan = await MotherDietPlan.findByIdAndDelete(req.params.id)
            res.send(deleteMotherDietPlan)
    }catch(e){
        res.send(e)
    }
})

module.exports = router;
