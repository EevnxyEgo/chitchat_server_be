import createHttpError from "http-errors"
import validator from "validator";
import { userModel } from "../models/index.js";
import bcrypt from "bcrypt";

//env
const {DEFAULT_PIC, DEFAULT_STATUS} = process.env

export const createUser = async(userData)=>{
    const {name, email,picture, status, password} = userData;

    //check if empty
    if(!name || !email || !password){
        throw createHttpError.BadRequest("please fill all fields")
    }

    //check name
    if(!validator.isLength(name,{
        min:2,
        max:20
        })
    ){
        throw createHttpError.BadRequest("please make sure your name is between 2 and 20 characters long")
    }

    //check status
    if(status && status.length > 64){
        if(status.length>64){
            throw createHttpError.BadRequest("please make sure your status is less than 64 characters long")
        }
    }

    //check email
    if(!validator.isEmail(email)){
        throw createHttpError.BadRequest("please make sure provide a valid email address")
    }

    //check user in database
    const checkDb=await userModel.findOne({email});
    if(checkDb){
        throw createHttpError.Conflict("this email already exist");
    }

    //check password
    if(!validator.isLength(password,{
        min:6,
        max:128
        })
    ){
        throw createHttpError.BadRequest("please make sure your name is between 6 and 128 characters long");
    }

    //add user to database
    const user = await new userModel({
        name,
        email,
        picture: picture || DEFAULT_PIC,
        status: status || DEFAULT_STATUS,
        password,
    }).save();

    return user;
};

export const signUser = async(email,password)=>{
    const user= await userModel.findOne({email: email.toLowerCase()}).lean();

    //check user exist
    if(!user){
        throw createHttpError.NotFound("Invalid credentials");
    }

    //compare password
    let passwordMatches = await bcrypt.compare(password, user.password);
    if(!passwordMatches){
        throw createHttpError.NotFound("Invalid credentials");
    }

    return user;

};