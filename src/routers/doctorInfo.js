const express = require('express');
const router = new express.Router();
const DoctorInfo = require('../models/doctorInfo');

// Handle post request to add Doctor Info
router.post('/doctorInfo', async (req, res) => {
  try {
    const addingDoctorInfo = new DoctorInfo(req.body);
    const insertDoctorInfo = await addingDoctorInfo.save();
    res.status(201).send(insertDoctorInfo);
  } catch (e) {
    res.status(400).send(e);
  }
});


// Handle get request for all Doctor Info with filtering by review
router.get('/getDoctorInfo', async (req, res) => {
    try {
      const filter = {};
      if (req.query.review) {
        filter.review = req.query.review;
      }
      if (req.query.price) {
        filter.charges = req.query.price;
      }
      if (req.query.specialization) {
        filter.specialization = req.query.specialization;
      }
      const getDoctorInfo = await DoctorInfo.find(filter);
      res.send(getDoctorInfo);
    } catch (e) {
      res.status(500).send(e);
    }
  });

// Handle get request for a specific Doctor Info
router.get('/getDoctorInfo/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const getDoctorInfo = await DoctorInfo.findById(_id);
    if (!getDoctorInfo) {
      return res.status(404).send();
    }
    res.send(getDoctorInfo);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Handle patch request for Doctor Info
router.patch('/updateDoctorInfo/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'qualification', 'specialization', 'contactNo', 'review', 'charges'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const _id = req.params.id;
    const updateDoctorInfo = await DoctorInfo.findByIdAndUpdate(_id, req.body, { new: true });
    if (!updateDoctorInfo) {
      return res.status(404).send();
    }
    res.send(updateDoctorInfo);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Handle delete request for Doctor Info
router.delete('/deleteDoctorInfo/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteDoctorInfo = await DoctorInfo.findByIdAndDelete(_id);
    if (!deleteDoctorInfo) {
      return res.status(404).send();
    }
    res.send(deleteDoctorInfo);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
