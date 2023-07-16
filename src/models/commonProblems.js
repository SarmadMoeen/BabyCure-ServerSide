
const express = require('express')
const mongoose = require('mongoose')

const commonProblemsSchema = new mongoose.Schema({
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
const CommonProblems = new mongoose.model("CommonProblem",commonProblemsSchema)
module.exports = CommonProblems;