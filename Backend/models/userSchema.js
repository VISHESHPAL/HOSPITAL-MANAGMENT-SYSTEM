import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true,
        minLength: [3, "FirstName Must Contaiin At Least 3 Charactors "]
    },
    lastName : {
        type : String,
        required: true,
        minLength: [3, "lastName Must Contaiin At Least 3 Charactors "]
    }, 
    email : {
        type : String,
        required: true,
        validate: [validator.isEmail, " Please Provide a Valid Email"]
    },
    phone : {
        type : String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits "],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits "],

    },
    nic : {
        type : String,
        required: true,
        minLength: [5, "NIC Must Contain Exact 5 Digit"],
        maxLength: [5, "NIC Must Contain Exact 5 Digit"],   
    }, 
    dob:{
        type : Date,
        required: [true, "DOB is Required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    password:{
        type: String,
        minLength:[8, "Password Must Contain 8 Charectors"],
        required: true,
        select: false,
    },
    role:{
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment:{
        type: String
    },
    docAvatar:{
        public_id: String,
        url: String,
    },


});

userSchema.pre("save", async function  (next) {
   if(!this.isModified("password")){
     return next();
   }
   this.password = await bcrypt.hash(this.password,8);
       next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    
};

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    });
}; 



export const User = mongoose.model("User", userSchema);