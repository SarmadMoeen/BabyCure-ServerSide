
const express = require('express')
const mongoose = require('mongoose')

const physicalActivitiesSchema = new mongoose.Schema({
      imageUrl:{
      type:String,
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
const PhysicalActivities = new mongoose.model("PhysicalActivities",physicalActivitiesSchema)
module.exports = PhysicalActivities;