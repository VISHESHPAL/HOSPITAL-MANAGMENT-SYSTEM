import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message : {
        type : String,
        required: true,
        minLength: [10, "Message Must Contaiin At Least 10 Charactors "],
    }, 

});

export const Message = mongoose.model("Message", messageSchema);