
const express = require('express')
const mongoose = require('mongoose')

const reqCustomizeDietPlanSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
     }, 
     age:{
        type:Number,
        required:true,
        trim:true
     },
     weight:{
         type:Number,
         required:true,
         trim:true
     },
     description:{
      type:String,
      required:true,
      trim:true
     }
     
})

//Here We are creating Collection of dietPlan
const RequestCustomizeDietPlan = new mongoose.model("RequestDietPlan",reqCustomizeDietPlanSchema)
module.exports = RequestCustomizeDietPlan;