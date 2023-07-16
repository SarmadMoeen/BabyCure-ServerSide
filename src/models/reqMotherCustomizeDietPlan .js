
const express = require('express')
const mongoose = require('mongoose')

const reqMotherCustomizeDietPlanSchema = new mongoose.Schema({
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
const RequestMotherCustomizeDietPlan = new mongoose.model("MotherRequestDietPlan",reqMotherCustomizeDietPlanSchema)
module.exports = RequestMotherCustomizeDietPlan;