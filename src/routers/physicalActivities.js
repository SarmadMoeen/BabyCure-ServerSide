
const express = require('express');
const router = new express.Router();

const PhysicalActivities = require('../models/physicalActivities')



//Here we will handle post request for add Milestones
router.post("/physicalActivities", async (req,res)=>{
    try{
        const addingPhysicalActivities = new PhysicalActivities()
        addingPhysicalActivities.imageUrl = req.body.imageUrl;
        addingPhysicalActivities.title = req.body.title;
        addingPhysicalActivities.description = req.body.description;

       

        try{
            const insertPhysicalActivities = await addingPhysicalActivities.save()
            console.log(insertPhysicalActivities)
            res.status(201).send(insertPhysicalActivities)
    
        }
        catch(e){
            console.log(e);
        }
    }catch(e){
        res.send(e)
    }
})
    //Here we handle the get Request for Milestones
    router.get("/getPhysicalActivities", async (req, res) => {
  try {
    let query = {};
    if (req.query.filter) {
      query.title = { $regex: req.query.filter, $options: "i" };
    }
    const getPhysicalActivities = await PhysicalActivities.find(query);
    res.send(getPhysicalActivities);
  } catch (e) {
    res.send(e);
  }
});

    //Here we handle the get Request for a specific Milestone
    router.get("/getPhysicalActivities/:id", async (req,res)=>{
    try{
            const _id = req.params.id
            const getPhysicalActivity = await PhysicalActivities.find({_id})
            res.send(getPhysicalActivity)
    }catch(e){
        res.send(e)
    }
})

//Here we handle the patch request for Milestone
   
    router.patch("/updatePhysicalActivities/:id", async (req,res)=>{
    try{
                const _id = req.params.id
                const updatePhysicalActivity = await PhysicalActivities.findByIdAndUpdate({_id} ,req.body,{new:true})
                res.send(updatePhysicalActivity)
    }catch(e){
            res.send(e)
    }
})

    router.delete("/deletePhysicalActivities/:id", async (req,res)=>{
    try{
            const deletePhysicalActivity = await PhysicalActivities.findByIdAndDelete(req.params.id)
            res.send(deletePhysicalActivity)
    }catch(e){
        res.send(e)
    }
})

module.exports = router;
