const mongoose=require("mongoose"),BlacklistSchema=new mongoose.Schema({title:{type:String,required:!0},description:{type:String,required:!0},ip:{type:String,required:!0},macaddres:{type:String,required:!0},dateEnd:{type:Date,default:Date.now},date:{type:Date,default:Date.now}});module.exports=mongoose.model("Blacklist",BlacklistSchema);
