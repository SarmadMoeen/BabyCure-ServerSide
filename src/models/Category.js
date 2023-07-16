
const express = require('express')
const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
     }
})

//Here We are creating Collection of dietPlan
const Category = new mongoose.model("Category",CategorySchema)
const getCategories = async()=>{
    return await Category.find({});
}
module.exports = {
    Category,
    getCategories
}