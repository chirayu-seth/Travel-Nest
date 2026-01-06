const mongoose = require("mongoose");
const Schema= mongoose.Schema;


const homesSchema= new Schema({
    title:{
        type: String,
        required: true,
    } ,
    description: String,
        image:{
           url:String,
           filename: String,
    }, 

    price: Number,
    location: String,
    country: String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    review:[
        {
            type: Schema.Types.ObjectId,
            ref:"review"
        }
    ]
   

}, {timestamps:true})
const home = mongoose.model("home", homesSchema);
module.exports=home;