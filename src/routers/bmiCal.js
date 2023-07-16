
const express = require('express');

const router = new express.Router();

const BmiCal = require('../models/bmiCal')



//Here we will handle post request for add Milestones
router.post("/bmiCal", async (req,res)=>{
    try{
        const addingBmiCal = new BmiCal()
        addingBmiCal.bmiResult = req.body.bmiResult;
        console.log(req.body)

        try{
            const insertBmiCal = await addingBmiCal.save()
            console.log(insertBmiCal)
            res.status(201).send(insertBmiCal)
    
        }
        catch(e){
            console.log(e);
        }
    }catch(e){
        res.send(e)
    }
})
    //Here we handle the get Request for Milestones
    router.get("/getBmiCal", async (req,res)=>{
        try{
                const getBmiCal = await BmiCal.find({})
                res.send(getBmiCal)
        }catch(e){
            res.send(e)
        }
    })

    //Here we handle the get Request for a specific Milestone
    router.get("/getBmiCal/:id", async (req,res)=>{
    try{
            const _id = req.params.id
            const getBmiCal = await BmiCal.find({_id})
            res.send(getBmiCal)
    }catch(e){
        res.send(e)
    }
})

//Here we handle the patch request for Milestone
   
    router.patch("/updateBmiCal/:id", async (req,res)=>{
    try{
                const _id = req.params.id
                const updateBmiCal = await BmiCal.findByIdAndUpdate({_id} ,req.body,{new:true})
                res.send(updateBmiCal)
    }catch(e){
            res.send(e)
    }
})

    router.delete("/deleteMilestones/:id", async (req,res)=>{
    try{
            const deleteBmiCal = await BmiCal.findByIdAndDelete(req.params.id)
            res.send(deleteBmiCal)
    }catch(e){
        res.send(e)
    }
})

module.exports = router;
