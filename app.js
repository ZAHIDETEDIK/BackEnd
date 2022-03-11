const express=require('express');
const mongoose= require('mongoose');
const password="ODvScspPpRy2PSfk"
const userName="eylem123"
const uri=`mongodb+srv://${userName}:${password}@cluster0.s96ba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose
.connect (uri)
.then(()=>console.log("connecté à mangodb"))
.catch ((err)=> console.error(err))
const app=express();
module.exports = app;
