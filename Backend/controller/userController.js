import { catchAsyneErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/userSchema.js"
import {generateToken} from "../utils/jwtToken.js"
import cloudinary from 'cloudinary';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const patientRegister = catchAsyneErrors(async (req,res,next,) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    } = req.body;
    if(!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic ||
        !role
    ){
        return next(new ErrorHandler ("Please Fill Full From!",400));
    }
     let user = await User.findOne({  email });
     if(user){
        return next(new ErrorHandler("User Already Registerd! ", 400));
     }
     user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
     });

     generateToken(user, "User Registered", 200, res)
    
     
});

export const login = catchAsyneErrors(async(req,res,next) =>{
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role){
      return next(new ErrorHandler("Please Provide All Details", 400))    
    }
    if(password !== confirmPassword){

        return next(new ErrorHandler("Password and ConfirmPassword Do not Match", 400));    

    }
    const user = await User.findOne({email}).select("+password");
    if(!user){

       return next(new ErrorHandler("Invalid Password Or Email", 400));    
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password Or Email", 400));    
    }
    if(role  !== user.role){
        return next(new ErrorHandler("User With This role is Not Found! ", 400));    

    }

      generateToken(user, "User Logged In Successfully ! ", 200, res)

});

export const addNewAdmin = catchAsyneErrors(async (req,res,next) =>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
    } = req.body;
    if(!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic 
    ){
        return next(new ErrorHandler ("Please Fill Full From!",400));
    }
    const isRagistered = await User.findOne({email});
    if(isRagistered){
      return next(new ErrorHandler(` ${isRagistered.role}  with this Email Already Registeres ! `, 400));    
  
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role: "Admin",
    });
    res.status(200).json({
        success: true,
        message: "New Admin Registered !",
    });
})

export const getAllDoctors = catchAsyneErrors(async(req,res,next) =>{
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors
    });
});

export const getUserDetails = catchAsyneErrors(async(req,res,next) =>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,

    });
});

export const logoutAdmin = catchAsyneErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken", "",{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: "Admin Log Out Successfully !",
    });
});

export const logoutPatient = catchAsyneErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken", "",{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: "Patient Log Out Successfully !",
    });
});

export const addNewDoctor = catchAsyneErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0) {
        return next (new ErrorHandler("Doctor Avatar Required", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];

    // Check the file mimetype to see if it's allowed
     if (!allowedFormats.includes(docAvatar.mimetype)) {
       return next(new ErrorHandler("File format not supported", 400));
}

    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment
    } = req.body;
    if(
        !firstName ||
        !lastName ||
        !email   ||
        !phone  ||
        !password ||
        !gender ||
        !dob ||
        !nic ||
        !doctorDepartment
    ){
       return next (new ErrorHandler("  Please Provide Full Details !" , 400));
    }
      const isRagistered = await User.findOne({ email });
      if(isRagistered){
       return next (new ErrorHandler(`${isRagistered.role} already registered with this email ! `
         , 400
        )
      );
    }
     const cloudinaryResponce = await cloudinary.uploader.upload(docAvatar.tempFilePath
      );
     if(!cloudinaryResponce || cloudinaryResponce.error){
        console.error("Cloudinary Error:", cloudinaryResponce.error || "Unknown Cloudinary Error");
     }

     const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment,
        role : "Doctor",
        docAvatar:{
            public_id: cloudinaryResponce.public_id,
            url: cloudinaryResponce.secure_url,  
        },
    });
    res.status(200).json({
        success: true,
        message: "New Doctor Registered !",
        doctor
    });
});