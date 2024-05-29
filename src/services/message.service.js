import createHttpError from "http-errors";
import { messageModel } from "../models/index.js"

export const createMessage = async(data) => {
    let newMessage = await messageModel.create(data);
    if (!newMessage){
        throw createHttpError.BadRequest("something went wrong");
    }
    return newMessage;
};

export const populateMessage = async(id) => {
    let message = await messageModel.findById(id).populate({
        path:"sender",
        select:"name picture",
        model: "userModel",
    })
    .populate({
        path:"conversation",
        select:"name picture isGroup users",
        model: "conversationModel",
        populate: {
            path: "users",
            select: "name email picture status",
            model: "userModel"
        }
    });
    if (!message){
        throw createHttpError.BadRequest("something went wrong");
    }
    return message;
};

export const getConversationMessage = async(conversationId)=>{
    const messages = await messageModel.find({conversation: conversationId})
    .populate("sender", "name picture email status")
    .populate("conversation");
    if(!messages){
        throw createHttpError.BadRequest("Something went wrong")
    }
    return messages;
}