
import mongoose from "mongoose";

export const  dbConnection = () =>{
     mongoose.connect(process.env.MONG0_URI,{
        dbName : "MERN_STACK_HOSPITAL_MANAGMENT_SYSTEM",
     })
     .then( () =>{
        console.log("Connnected to database");
     })
     .catch( (err) =>{
        console.log(`Some error occured while connecting the database:  ${err}`);
     });
 };

 