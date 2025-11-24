import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username : {
            type: String,
            required: true,
            unique : true,
            lowercase: true,
            index : true,
            trim : true
        },

        email : {
            type: String,
            required: true,
            unique : true,
            lowercase: true,
            trim : true
        },
        fullName : {
            type: String,
            required: true,
            
            lowercase: true,
            
            trim : true
        },
        avatar : {
            type: String, // cloud URL
            required : true
        },
        coverImage : {
            type: String, 
        
        },
        watchHistory : {
            type : Schema.Types.ObjectId,
            ref : "Vedio"
        },
        password : {
            type : String,
            required : [true, 'Password is Required']
        },
        refershTokens : {
            type: String

        }
    }
    ,
    {
        timestamps: true
    }
)

// Direcrt Encyption is not allowed so we need help from Mooongoose hooks---
// So, we will use them and 
userSchema.pre("save", async function (next){
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    else
    {
        next();
    }
    
}) 

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessTokens = async function()
{
    return await jwt.sign(
        {
            _id : this._id,
            username: this.username,
            fullName: this.fullName,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
           expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshTokens = async function()
{
    return await jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
           expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model('User', userSchema)