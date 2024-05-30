import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { searchUsersService } from "../services/user.service.js";
import { getAllUsers } from "../services/user.service.js";

export const searchUsers=async(req,res,next)=>{
    try {
        const keyword = req.query.search;
        if(!keyword){
            logger.error("please add a search query")
            throw createHttpError.BadRequest("something went wrong")
        }
        const users = await searchUsersService(keyword,req.user.userId);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}


export const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers(req.user.userId);
        res.status(200).json(users);
    } catch (error) {
        logger.error("Error fetching users:", error);
        next(createHttpError.InternalServerError("Something went wrong"));
    }
};
