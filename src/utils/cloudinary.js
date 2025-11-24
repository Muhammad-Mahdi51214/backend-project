import { v2 as cloudinary } from 'cloudinary'

import fs from "fs";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const UploadOnCLOUDINARY = async (FilePath) => {
try{
    if(!FilePath)
    {
        return null;
    }


    const response = await cloudinary.uploader.upload(FilePath,{
      resource_type : "auto"
    })
    // File has been uploaded successfully  ---  on Cloudinary
    console.log("file is uploaded on cloudinary", response)
    return response;
}   
catch(error)
{
  fs.unlink(FilePath)     // remove the locally uploaded file
  
  return null;
}
}

export {UploadOnCLOUDINARY}