
const express = require('express')
const mongoose = require('mongoose')

const payment = new mongoose.Schema({
      cardHolder:{
      type:String,
      required:true,
      trim:true
      },
     
      cardNumber:{
        type:String,
        required:true,
        trim:true
     },
     date:{
        type:Date,
        required:true,
        trim:true
     },
     cv:{
        type:Number,
        required:true,
        trim:true
     }
})

//Here We are creating Collection of  Payment
const Payment = new mongoose.model("Payment",payment)
module.exports = Payment;