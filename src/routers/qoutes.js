
const express = require('express');
const router = new express.Router();

const Qoutes = require('../models/qoutes')



//Here we will handle post request for add Milestones
router.post("/qoutes", async (req,res)=>{
    try{
        const addingQoutes = new Qoutes(req.body)
        console.log(req.body)

        try{
            const insertQoutes = await addingQoutes.save()
            res.status(201).send(insertQoutes)
    
        }
        catch(e){
            console.log(e);
        }
    }catch(e){
        res.send(e)
    }
})
    //Here we handle the get Request for Milestones
    router.get("/getQoutes", async (req,res)=>{
        try{
                const getQoutes = await Qoutes.find({})
                res.send(getQoutes)
        }catch(e){
            res.send(e)
        }
    })

    //Here we handle the get Request for a specific Milestone
    router.get("/getQoutes/:id", async (req,res)=>{
    try{
            const _id = req.params.id
            const getQoutes = await Qoutes.find({_id})
            res.send(getQoutes)
    }catch(e){
        res.send(e)
    }
})

//Here we handle the patch request for Milestone
   
    router.patch("/updateQoutes/:id", async (req,res)=>{
    try{
                const _id = req.params.id
                const updateQoutes = await Qoutes.findByIdAndUpdate({_id} ,req.body,{new:true})
                res.send(updateQoutes)
    }catch(e){
            res.send(e)
    }
})

    router.delete("/deleteQoutes/:id", async (req,res)=>{
    try{
            const deleteQoutes = await Qoutes.findByIdAndDelete(req.params.id)
            res.send(deleteQoutes)
    }catch(e){
        res.send(e)
    }
})

module.exports = router;
