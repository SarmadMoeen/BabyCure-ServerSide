
const express = require('express');
const router = new express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const Babies = require('../models/babies')

// Here we will handle post request for add babies
router.post('/Babies',  async (req, res) => {
  try {
    const addingBabies = new Babies();
    addingBabies.userID = req.body.userID; // Assign the logged-in user's ID from the token payload
    addingBabies.name = req.body.name;
    addingBabies.dob = req.body.date;
    addingBabies.gender = req.body.value;
    addingBabies.weight = req.body.weight;
    addingBabies.height = req.body.height;

    const insertedBaby = await addingBabies.save();
    console.log(insertedBaby)
    res.status(201).json(insertedBaby);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

  /*
   addingBabies.userID = req.user._id;  // Assign the logged-in user's ID from the token payload
      addingBabies.name = req.body.name;
      addingBabies.dob = req.body.date;
      addingBabies.gender = req.body.value;
      addingBabies.weight = req.body.weight;
      addingBabies.height = req.body.height;*/
  
  

//Here we handle the get Request forbabies
router.get("/getBabies", async (req, res) => {
  try {
    const babies = await Babies.find({ userID: req.query.userID });
    res.send(babies);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/getBabyDOB/:babyId", async (req, res) => {
  try {
    const baby = await Babies.findById(req.params.babyId);
    if (!baby) {
      return res.status(404).send("Baby not found");
    }
    res.send({ dob: baby.dob });
  } catch (error) {
    res.status(500).send(error);
  }
});

  


//Here we handle the get Request for a specific babies
router.get("/getBabies/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const getBaby = await Babies.find({ _id })
        res.send(getBaby)
    } catch (e) {
        res.send(e)
    }
})
//Here we handle the Patch  Request for a specific babies
router.patch("/updateBabies/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const updateBaby = await Babies.findByIdAndUpdate({ _id }, req.body, { new: true })
        res.send(updateBaby)
    } catch (e) {
        res.send(e)
    }
})
router.delete("/deleteBabies/:id", async (req, res) => {
    try {
        const deleteBaby = await Babies.findByIdAndDelete(req.params.id)
        res.send(deleteBaby)
    } catch (e) {
        res.send(e)
    }
})

module.exports = router;
