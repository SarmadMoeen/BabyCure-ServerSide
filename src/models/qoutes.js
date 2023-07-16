
const express = require('express')
const mongoose = require('mongoose')

const qoutesSchema = new mongoose.Schema({
   imageUrl:{
      type:String,
      required:true,
      trim:true
      }

})

//Here We are creating Collection of dietPlan
const Qoutes = new mongoose.model("Qoutes",qoutesSchema)
module.exports = Qoutes;