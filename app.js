require('dotenv').config()
const express=require('express');
const path = require('path');
const mongoose= require('mongoose');
const password=process.env.PASSWORD
const userName=process.env.USERNAME
console.log({userName,password})
const uri=`mongodb+srv://${userName}:${password}@cluster0.s96ba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose
.connect (uri)
.then(()=>console.log("connecté à mangodb"))
.catch ((err)=> console.error(err))
const app=express();
module.exports = app;
