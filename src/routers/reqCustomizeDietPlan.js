
const express = require('express');
const router = new express.Router();

const RequestCustomizeDietPlan = require('../models/reqCustomizeDietPlan')



//Here we will handle post request for add Milestones
router.post("/postReqCustomizeDietPlan", async (req,res)=>{
    try{
        const addingReqCustomizeDietPlan = new RequestCustomizeDietPlan()
        addingReqCustomizeDietPlan.name = req.body.name;
        addingReqCustomizeDietPlan.age = req.body.age;
        addingReqCustomizeDietPlan.weight = req.body.weight;
        addingReqCustomizeDietPlan.description = req.body.cause;

        try{
            const insertReqCustomizeDietPlan = await addingReqCustomizeDietPlan.save()
            console.log(insertReqCustomizeDietPlan)
            res.status(201).send(insertReqCustomizeDietPlan)
    
        }
        catch(e){
            console.log(e);
        }
    }catch(e){
        res.send(e)
    }
})
    //Here we handle the get Request for Milestones
    router.get("/getCustomizeDietPlanReq", async (req,res)=>{
        try{
                const getCustomizeReq = await RequestCustomizeDietPlan.find({})
                res.send(getCustomizeReq)
        }catch(e){
            res.send(e)
        }
    })

    //Here we handle the get Request for a specific Milestone
    router.get("/getCustomizeDietPlanReq/:id", async (req,res)=>{
    try{
            const _id = req.params.id
            const getMilestone= await RequestCustomizeDietPlan.find({_id})
            res.send(getMilestone)
    }catch(e){
        res.send(e)
    }
})

//Here we handle the patch request for Milestone
   
    router.patch("/updateCustmizeReq/:id", async (req,res)=>{
    try{
                const _id = req.params.id
                const updateCustmizeReq = await RequestCustomizeDietPlan.findByIdAndUpdate({_id} ,req.body,{new:true})
                res.send(updateCustmizeReq)
    }catch(e){
            res.send(e)
    }
})

    router.delete("/deleteCustmizeReq/:id", async (req,res)=>{
    try{
            const deleteCustmizeReq = await RequestCustomizeDietPlan.findByIdAndDelete(req.params.id)
            res.send(deleteCustmizeReq)
    }catch(e){
        res.send(e)
    }
})

module.exports = router;
