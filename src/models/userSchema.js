const mongoose= require("mongoose")
const validator=require("validator")


//crating user schema
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        // minlength:3,
        // validate(value){
        //     if(!validator.isNumeric(value) ||  validator.isAlphanumeric(value))
        //     {
        //         throw new Error("invalid name")
        //     }
        // }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id")
            }
        }

    },
    phone:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:10,
        unique:true
    },
    DbMessege:{
        type:String,
        required:true,
        minlength:3,
    }

})

//creating user collection

const User_collection = new mongoose.model("User_collection",UserSchema)

module.exports=User_collection