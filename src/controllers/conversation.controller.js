import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { doesConversationExist } from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";
import { createConversation } from "../services/conversation.service.js";
import { populateConversation } from "../services/conversation.service.js";

export const createOpenConversation = async(req,res,next)=>{
    try{
        const senderId=req.user.userId;
        const {receiverId} = req.body;

        if(!receiverId){
            logger.error(
                "please provide the user Id you wanna start conversation with"
            );
            throw createHttpError.BadGateway("Something went wrong!");
        }

        const existedConversation = await doesConversationExist(
            senderId, 
            receiverId
        );

        if(existedConversation){
            res.json(existedConversation)
        }else{
            let receiverUser = await findUser(receiverId)
            let conversationData = {
                name: receiverUser.name,
                isGroup: false,
                users: [senderId, receiverId],
            };
            const newConversation = await createConversation(conversationData);
            const populatedConversation = await populateConversation(newConvo._id,"users","-password");
            res.status(200).json(populatedConversation)
        }   

    } catch(error) {
        next(error);
    }
}