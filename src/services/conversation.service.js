import createHttpError from "http-errors";
import { conversationModel, userModel } from "../models/index.js";

export const doesConversationExist =  async(senderId, receiverId) => {
    let conversations = await conversationModel.find(
        {
            isGroup: false,
            $and:[
                {users:{$elemMatch:{$eq:senderId}}},
                {users:{$elemMatch:{$eq:receiverId}}}
            ],
        }
    )
        .populate("users","-password")
        .populate("latestMessage")
    if (!conversations) {
        throw createHttpError.BadRequest("Something went wrong!");
    }

    conversations = await userModel.populate(conversations,{
        path:"latestMessage.sender",
        select: "name email picture status",
    });

    return conversations[0]

};

export const createConversation = async(data)=>{
    const newConversation = await conversationModel.create(data);
    if(!newConversation){
        throw createHttpError.BadRequest("Something went wrong");
    }
    return newConversation
};

export const populateConversation = async(id, fieldsToPopulate, fieldsToRemove)=>{
    const populatedConversation = await conversationModel.findOne({
        _id: id
    }).populate(fieldsToPopulate, fieldsToRemove);
    if (!populatedConversation){
        throw createHttpError.BadRequest("Something went wrong");
    }
    return populatedConversation;
};