
const express = require('express');
const router = new express.Router();

const CommonProblems = require('../models/commonProblems')



//Here we will handle post request for add Milestones
router.post("/commonProblems", async (req,res)=>{
    try{
        const addingCommonProblems = new CommonProblems()
        addingCommonProblems.imageUrl = req.body.imageUrl;
        addingCommonProblems.title = req.body.title;
        addingCommonProblems.description = req.body.description;
        console.log(req.body)

        try{
            const insertCommonProblems = await addingCommonProblems.save()
            console.log(insertCommonProblems);
            res.status(201).send(insertCommonProblems)
    
        }
        catch(e){
            console.log(e);
        }
    }catch(e){
        res.send(e)
    }
})
    //Here we handle the get Request for Milestones
    router.get("/getCommonProblems", async (req,res)=>{
        try{
            const getCommonProblem = await CommonProblems.find({})
            res.send(getCommonProblem)
        }catch(e){
        res.send(e)
    }
    })

    //Here we handle the get Request for a specific Milestone
    router.get("/getCommonProblems/:id", async (req,res)=>{
    try{
            const _id = req.params.id
            const getCommonProblem = await CommonProblems.find({_id})
            res.send(getCommonProblem)
    }catch(e){
        res.send(e)
    }
})

//Here we handle the patch request for Milestone
   
    router.patch("/updateCommonProblems/:id", async (req,res)=>{
    try{
                const _id = req.params.id
                const updateCommonProblem = await CommonProblems.findByIdAndUpdate({_id} ,req.body,{new:true})
                res.send(updateCommonProblem)
    }catch(e){
            res.send(e)
    }
})

    router.delete("/deleteCommonProblems/:id", async (req,res)=>{
    try{
            const deleteCommonProblem = await CommonProblems.findByIdAndDelete(req.params.id)
            res.send(deleteCommonProblem)
    }catch(e){
        res.send(e)
    }
})

module.exports = router;
