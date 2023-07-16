
const express = require('express')
const mongoose = require('mongoose')

const motherDietPlanSchema = new mongoose.Schema({
   
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
const MotherDietPlan = new mongoose.model("MotherDietPlan",motherDietPlanSchema)
module.exports = MotherDietPlan;