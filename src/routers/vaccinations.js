
const express = require('express');
const router = new express.Router();

const Vaccinations = require('../models/vaccinations');




//Here we will handle post request for add Vaccinations
router.post("/vaccinations", async (req,res)=>{
    try{
        const addingVaccinations = new Vaccinations()

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
    router.get("/getVaccinations", async (req,res)=>{
        try{
                const babyId = req.query.babyId
                const getVaccinations = await Vaccinations.find({babyId:babyId})
                res.send(getVaccinations)
        }catch(e){
            res.send(e)
        }
    })

    //Here we handle the get Request for a specific Vaccination
    router.get("/getVaccination/:id", async (req,res)=>{
    try{
            const _id = req.params.id
            const getVaccination= await Vaccinations.find({_id})
            res.send(getVaccination)
    }catch(e){
        res.send(e)
    }
})

//Here we handle the patch request for Vaccinations
   
    router.patch("/updateVaccinations/:id", async (req,res)=>{
    try{
                const _id = req.params.id
                const updateVaccinations = await Vaccinations.findByIdAndUpdate({_id} ,req.body,{new:true})
                res.send(updateVaccinations)
    }catch(e){
            res.send(e)
    }
})

//Here we handle the delete request for Vaccinations

router.delete("/deleteVaccination/:id", async (req, res) => {
    console.log("Request received!");
    console.log("ID parameter:", req.params.id); // Add this line to log the ID parameter
    try {
        const deleteVaccination = await Vaccinations.findByIdAndDelete(req.params.id);
        res.send(deleteVaccination);
        console.log(deleteVaccination);
    } catch (e) {
        res.send(e);
    }
});


module.exports = router;
