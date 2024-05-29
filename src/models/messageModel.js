import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;
const messageSchema = mongoose.Schema(
    {
        sender: {
            type: ObjectId,
            ref: "userModel",
        },
        message: {
            type: String,
            trim: true,
        },
        conversation:{
            type: ObjectId,
            ref: "conversationModel",
        },
        files: [],
    },
    {
        collection: "messages",
        timestamps: true,

    }
);

const messageModel =  mongoose.models.messageModel || mongoose.model("messageModel", messageSchema);

export default messageModel;