
const mongoose = require("mongoose");
// schema
const sauceSchema=mongoose.Schema({
    userID:{type:String,require:true },
    name:{ type:String,require:true},
    imageUrl:{ type:String,require:true},
    description:{type:String,require:true},
});
module.exports=mongoose.model('sauce',sauceSchema);