const mongoose=require("mongoose")

const userschema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true}
},{collection:'users'})

const usersmodel=mongoose.model('userschema',userschema)

module.exports=usersmodel