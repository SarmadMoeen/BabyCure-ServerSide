
const express = require('express');
const router = new express.Router();

const Milestones = require('../models/milestones')



//Here we will handle post request for add Milestones
router.post("/milestones", async (req,res)=>{
    try{
        const addingMilestones = new Milestones()
        addingMilestones.babyId=req.body.babyId
        addingMilestones.title = req.body.milestoneName;
        addingMilestones.description = req.body.description;
        addingMilestones.date = req.body.date;
        

        try{
            const insertMilestones = await addingMilestones.save()
            console.log(insertMilestones)
            res.status(201).send(insertMilestones)
    
        }
        catch(e){
            console.log(e);
        }
    }catch(e){
        res.send(e)
    }
})
    //Here we handle the get Request for Milestones
    router.get("/getMilestones", async (req, res) => {
        try {
          const babyId = req.query.babyId; // Retrieve babyId from query parameters
          const getMilestones = await Milestones.find({ babyId: babyId }); // Use babyId to filter milestones
          res.send(getMilestones);
        } catch (e) {
          res.send(e);
        }
      });
      
      
      

    //Here we handle the get Request for a specific Milestone
    router.get("/getMilestones/:id", async (req,res)=>{
    try{
            const _id = req.params.id
            const getMilestone= await Milestones.find({_id})
            res.send(getMilestone)
    }catch(e){
        res.send(e)
    }
})

//Here we handle the patch request for Milestone
   
    router.patch("/updateMilestones/:id", async (req,res)=>{
    try{
                const _id = req.params.id
                const updateMilestone = await Milestones.findByIdAndUpdate({_id} ,req.body,{new:true})
                res.send(updateMilestone)
    }catch(e){
            res.send(e)
    }
})

    router.delete("/deleteMilestones/:id", async (req,res)=>{
    console.log("Request received!");
    console.log("ID parameter:", req.params.id);
    try{
            const deleteMilestone = await Milestones.findByIdAndDelete(req.params.id)
            res.send(deleteMilestone)
    }catch(e){
        res.send(e)
    }
})

module.exports = router;
