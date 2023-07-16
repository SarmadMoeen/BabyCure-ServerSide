
const express = require('express')
const mongoose = require('mongoose')

const bmiCalSchema = new mongoose.Schema({

    
  
     bmiResult:{
        type:Number,
        required:true,
        trim:true
     },  
  
})

//Here We are creating Collection of dietPlan
const BmiCal = new mongoose.model("BmiCal",bmiCalSchema)
module.exports = BmiCal;