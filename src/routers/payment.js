
const express = require('express');
const router = new express.Router();

const Payment = require('../models/payment')



//Here we will handle post request for add Vaccinations
router.post("/payment", async (req,res)=>{
    try{
        const addingPayment = new Payment()

        addingPayment.cardHolder = req.body.cardHolder;
        addingPayment.cardNumber = req.body.cardHolderNumber;
        addingPayment.date = req.body.date;
        addingPayment.cv = req.body.cv;


        try{
            const insertPayment = await addingPayment.save()
            console.log(insertPayment)
            res.status(201).send(insertPayment)
    
        }
        catch(e){
            console.log(e);
        }
    }catch(e){
        res.send(e)
    }
})
    //Here we handle the get Request for Vaccination
    router.get("/getPayments", async (req,res)=>{
        try{
                const getPayments = await Payment.find({})
                res.send(getPayments)
        }catch(e){
            res.send(e)
        }
    })
/*
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

    router.delete("/deleteVaccination/:id", async (req,res)=>{
    try{
            const deleteVaccination = await Vaccinations.findByIdAndDelete(req.params.id)
            res.send(deleteVaccination)
            console.log(deleteVaccination)
    }catch(e){
        res.send(e)
    }
})*/

module.exports = router;
