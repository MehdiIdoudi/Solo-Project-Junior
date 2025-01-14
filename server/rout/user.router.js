import {register,login,updateUser,getProfile} from "../../server/controller/user.controller.js" 
import express from "express";
import verifyToken from "../midlewere/authentication.js";

const userRouter = express.Router();

userRouter.post("/add", register);
userRouter.post("/login", login);
userRouter.put("/update/:id", updateUser);
userRouter.get('/profile', verifyToken, getProfile);

export default userRouter;