
const express = require('express')
const mongoose = require('mongoose')

const doctorInfoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
     }, 
     qualification:{
      type:String,
      required:true,
      trim:true
   },
     specialization:{
        type:String,
        required:true,
        trim:true
     },
     contactNo:{
         type:Number,
         required:true,
         trim:true
     },
     review:{
      type:Number,
      required:true,
      trim:true
     },
     charges:{
        type:Number,
        required:true,
        trim:true  
     }
     
})

//Here We are creating Collection of dietPlan
const DoctorInfo = new mongoose.model("DoctorInfo",doctorInfoSchema)
module.exports = DoctorInfo;