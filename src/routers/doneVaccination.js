
const express = require('express');
const router = new express.Router();

const DoneVaccinations = require('../models/doneVaccinations')



//Here we will handle post request for add Vaccinations
router.post("/doneVaccinations", async (req,res)=>{
    try{
        const addingVaccinations = new DoneVaccinations()
        addingVaccinations.babyId = req.body.babyId;
        addingVaccinations.key = req.body.key;
        addingVaccinations.vaccname = req.body.vaccname;
        addingVaccinations.date = req.body.date;


        try{
            const insertVaccinations = await addingVaccinations.save()
            console.log(insertVaccinations)
            res.status(201).send(insertVaccinations)
    
        }
        catch(e){
            console.log(e);
        }
    }catch(e){
        res.send(e)
    }
})
    //Here we handle the get Request for Vaccination
    router.get("/getDoneVaccinations", async (req,res)=>{
        try{

                const babyId = req.query.babyId
                const getVaccinations = await DoneVaccinations.find({babyId:babyId})
                res.send(getVaccinations)
        }catch(e){
            res.send(e)
        }
    })

    //Here we handle the get Request for a specific Vaccination
    router.get("/getDoneVaccination/:id", async (req,res)=>{
    try{
            const _id = req.params.id
            const getVaccination= await DoneVaccinations.find({_id})
            res.send(getVaccination)
    }catch(e){
        res.send(e)
    }
})

//Here we handle the patch request for Vaccinations
   
    router.patch("/updateDoneVaccinations/:id", async (req,res)=>{
    try{
                const _id = req.params.id
                const updateVaccinations = await DoneVaccinations.findByIdAndUpdate({_id} ,req.body,{new:true})
                res.send(updateVaccinations)
    }catch(e){
            res.send(e)
    }
})

//Here we handle the delete request for Vaccinations

    router.delete("/deleteDoneVaccination/:id", async (req,res)=>{
        console.log("request Recived")
        console.log("ID coming",req.params.id)
    try{
          
            const deleteVaccination = await DoneVaccinations.findByIdAndDelete(req.params.id)
            res.send(deleteVaccination)
            console.log(deleteVaccination)
    }catch(e){
        res.send(e)
    }
})

module.exports = router;
