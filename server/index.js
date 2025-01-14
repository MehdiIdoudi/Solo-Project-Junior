import express from "express";
import cors from "cors";
import userRouter from "../server/rout/user.router.js"

const app = express();
const port = 3001;
// import syncModels from "./databases/assossiation.js";
// syncModels()




app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});