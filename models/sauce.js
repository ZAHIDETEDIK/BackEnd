
const mongoose = require("mongoose");
// schema
const sauceSchema=mongoose.Schema({
    userID:{type:String,required:true },
    name:{ type:String,required:true},
    manufacturer:{ type:String,required:true},
    imageUrl:{ type:String,required:true},
    description:{type:String,required:true},
    mainPepper:{type:String,required:true},
    imageUrl:{type:String,required:true},
    heat:{type:Number,required:true},
    likes:{type:Number,required:true,default: 0},
    disLike:{type:Number,required:true,default: 0},
    usersLiked:{type:Number,required:true,default: 0},
    usersDisLiked:{type:Array,required:true,default:[]},

    
});
module.exports=mongoose.model('sauce',sauceSchema);