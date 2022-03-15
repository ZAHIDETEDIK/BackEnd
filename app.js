require('dotenv').config()
const express=require('express');
const path = require('path');
const mongoose= require('mongoose');
const path = require ('path');
const helmet=require('helmet')
const password=process.env.PASSWORD
const userName=process.env.USERNAME
console.log({userName,password})
const uri=`mongodb+srv://${userName}:${password}@cluster0.s96ba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose
.connect (uri)
.then(()=>console.log("connecté à mangodb"))
.catch ((err)=> console.error(err))
const app=express();
// definition de headers afin d'eviter les erreurs de Cors
app.use ((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-header','Origin,X-Requested-With,Content,Accept,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH,OPTION');
    next();
});
app.use(bodyParser.json());
// Enregistrement des routeurs

app.use('/api/sauce',sauceRoutes);
app.use('/api/auth',userRoutes);

module.exports = app;
