import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectDB = async () => {
    try
    {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_Name}`)
        console.log("Database connected!! DB HOST : ", connectionInstance.connection.host);
        // console.log("Complete Connection Instance is ", connectionInstance);
    }
    catch(error)
    {
        console.error("MONGO DB Connection Error ---- ",error)
        process.exit(1)
    }
}

export default connectDB;