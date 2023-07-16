
const express = require('express')
const mongoose = require('mongoose')

const vaccinations = new mongoose.Schema({

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
const Vaccinations = new mongoose.model("Vaccinations",vaccinations)
module.exports = Vaccinations;