import createHttpError from "http-errors";
import { userModel } from "../models/index.js"

export const findUser=async(userId)=>{
    const user = await userModel.findById(userId);
    if (!user) {
        throw createHttpError.BadRequest("Please fill all fields");
    }
    return user;
}

export const searchUsersService=async(keyword,userId)=>{
    const users=await userModel.find({
        $or:[
            {name:{$regex: keyword, $options:"i"}},
            {email:{$regex: keyword, $options:"i"}},
        ],
    }).find({
        _id:{$ne:userId}
    });
    return users;
}

export const getAllUsers = async (userId) => {
    const users = await userModel.find({_id:{$ne:userId}});
    return users;
};
