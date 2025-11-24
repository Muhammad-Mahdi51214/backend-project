import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { UploadOnCLOUDINARY } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>
{

    const {fullName, email, username, password} =  req.body;

    // Validation: Is the inputs correct or not
    if(fullName=="")
    {
        throw new ApiError(400,"FullName is Required")
    }
    if(email=="")
    {
        throw new ApiError(400,"Email is Required")
    }
    if(username=="")
    {
        throw new ApiError(400,"Username is Required")
    }
    if(password=="")
    {
        throw new ApiError(400,"Password is Required")
    }

    // check given email or username already exits or not

    const existedUser = User.findOne(
        {
            $or: [{username},{email}]
        })
    
        if(existedUser)
        {
            throw new ApiError(409,
                "Username or email Already exists"
            )
        }
    

        const avatarImageLocalPath = req.files?.avatar[0]?.path;
        console.log(avatarImageLocalPath);

        const coverImageLocalPath = req.files?.avatar[0]?.path;
        console.log(coverImageLocalPath)
         
        // check for Avatar Image: is it avaiable or not
        if(!avatarImageLocalPath)
        {
            throw new ApiError(400, "avatar is required")
        }

        // upload all these files on cloudinary 
        const avatar = await UploadOnCLOUDINARY(avatarImageLocalPath)
       console.log("Avatar object: After Uploading to  Cloudary: ", avatar) 
        const coverImage = await UploadOnCLOUDINARY(coverImageLocalPath)
        console.log("CoverImage object: After Uploading to  Cloudary: ", coverImage) 

        if(!avatar)
        {
            throw new ApiError(400, "Avatar upload unsuccessfully, please re-upload");
        }

        // upload to Database

        const user = await User.create(
            {
                username: username.toLowerCase(),
                email,
                fullName,
                avatar: avatar.url,
                coverImage: coverImage?.url || ""
            }
        )
         
        const userCreated = User.findById(user._id).select(
            "-password -refershTokens"
        )

        if(!userCreated)
        {
            throw new ApiError(500, "Something went wrong while creating user.")
        }
        
        res.status(201).json(
            new ApiResponse(200, userCreated, "user created successfully")
        )
        
})

export {registerUser}