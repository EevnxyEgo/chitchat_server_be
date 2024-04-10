import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email address"],
        unique: [true, "This email address already exist"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    picture:{
        type:String,
        default: "http://res.cloudinary.com/dnnwlqjk8/image/upload/v1712689326/hjtaewkaj0izgtpfuf73.png"
    },
    status:{
        type: String,
        default: "Hi there!!!",
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [6, "Please make sure your password is at least 6 characters long"],
        maxLength: [128, "Please make sure your password is less than 128 characters long"],
    },
}, {
    collection:"users",
    timestamps: true,
}
);
userSchema.pre("save", async function(next){
    try{
        if(this.isNew){
            const salt=await bcrypt.genSalt(12);
            const hashedPassword= await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    }catch (error){
        next(error);
    }
})
const userModel=
    mongoose.model.userModel || mongoose.model("userModel", userSchema);
    export default userModel;