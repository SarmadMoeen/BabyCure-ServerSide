
const express = require('express')
const mongoose = require('mongoose')

const doneVaccinations = new mongoose.Schema({

   babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Babies',
      required: true,
    },
      key:{
      type:Number,
      required:true,
      trim:true
      },
     
      vaccname:{
        type:String,
        required:true,
        trim:true
     },
     date:{
        type:Date,
        required:true,
        trim:true
     }
})

//Here We are creating Collection of  Vaccinations
const DoneVaccinations = new mongoose.model("DoneVaccinations",doneVaccinations)
module.exports = DoneVaccinations;