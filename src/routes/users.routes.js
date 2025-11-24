import { Router } from "express";
import { registerUser } from "../controllers/users.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.post("/register",
    upload.fields(
        [
            {
                name: "avatar",
                maxLength : 1
            },
            {
                name: "coverImage",
                maxLength : 1
            }
        ]
    )
    ,registerUser);

export { userRouter };
