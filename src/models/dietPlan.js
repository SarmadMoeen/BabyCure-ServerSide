
const express = require('express')
const mongoose = require('mongoose')

const dietPlanSchema = new mongoose.Schema({
   babyAge:{
      type:Number,
      required:true,
      trim:true
   }, 
   
   title:{
        type:String,
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
const DietPlan = new mongoose.model("DietPlan",dietPlanSchema)
module.exports = DietPlan;