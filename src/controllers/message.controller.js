import logger from "../configs/logger.config.js";
import { createMessage, populateMessage, getConversationMessage } from "../services/message.service.js";
import { updateLatestMessage } from "../services/conversation.service.js";

export const sendMessage = async(req,res,next) => {
    try{
        const userId =  req.user.userId;
        const {message, conversationId, files} = req.body;
        if ((!message && !files) || !conversationId){
            logger.error("please provide conversationId and message");
            return res.sendStatus(400);
        }
        const messageData={
            sender: userId,
            message,
            conversation: conversationId,
            files: files || [],
        };
        let newMessage = await createMessage(messageData);
        let populatedMessage = await populateMessage(newMessage);
        await updateLatestMessage(conversationId, newMessage);
        res.json(populatedMessage);
    }catch(error){
        next(error);
    }
}

export const getMessages = async(req,res,next) => {
    try{
        const conversationId = req.params.conversationId;
        if(!conversationId){
            logger.error("please add conversation id");
            res.sendStatus(400);
        }
        const messages = await getConversationMessage(conversationId);
        res.json(messages);
    }catch(error){
        next(error);
    }
}