import {register,login,updateUser,getProfile,addToCard} from "../../server/controller/user.controller.js" 
import express from "express";
import verifyToken from "../midlewere/authentication.js";

const userRouter = express.Router();

userRouter.post("/add", register);
userRouter.post("/login", login);

userRouter.put("/update/:id", verifyToken, updateUser);
userRouter.put("/addToCard",verifyToken,addToCard)
userRouter.get('/profile', verifyToken, getProfile);

export default userRouter;