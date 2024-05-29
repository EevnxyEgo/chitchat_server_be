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

export const getConversations = async(userId)=>{
    let conversations;
    await conversationModel.find({
        users: {$elemMatch:{$eq:userId}},   
    })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({updatedAt:-1})
    .then(async(results)=>{
        results = await userModel.populate(results,{
            path:"latestMessage.sender",
            select:"name email picture status"
        });
        conversations = results;
    }).catch((err)=>{
        throw createHttpError.BadRequest("Something went wrong")
    })
    return conversations;
};

export const updateLatestMessage = async(conversationId, message)=>{
    const updatedConversation = await conversationModel.findByIdAndUpdate(conversationId,{
        latestMessage: message,
    });
    if (!updatedConversation){
        throw createHttpError.BadRequest("Something went wrong");
    }
    return updatedConversation;
};
