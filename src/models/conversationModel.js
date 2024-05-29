import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types;
const conversationSchema=mongoose.Schema(
    {
        name: {
            type: String,
            required:[true, "Conversation name is required"],
            trim: true,
        },
        picture:{
            type: String,
            required: true,
        },
        isGroup:{
            type: Boolean,
            required: true,
            default: false,
        },
        users: [
            {
                type: ObjectId,
                ref:"userModel",
            },
        ],
        latestMessage:{
            type: ObjectId,
            ref: "messageModel",
        },
        admin:{
            type: ObjectId,
            ref: "userModel",
        },
    },
    {
        collection: "conversations",
        timestamps: true,
    },
);
const conversationModel=
    mongoose.models.conversationModel || 
    mongoose.model("conversationModel", conversationSchema);

export default conversationModel;