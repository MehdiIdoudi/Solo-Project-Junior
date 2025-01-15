import express from "express";
const ProductRouter = express.Router();
import {createProduct,getAllProducts,updateOne,deleteOne} from "../controller/product.controller.js";

ProductRouter.post("/addProduct", createProduct)
ProductRouter.get("/getAllProducts", getAllProducts)
ProductRouter.put("/updateProduct/:id", updateOne)
ProductRouter.delete("/deleteProduct/:id", deleteOne)

export default ProductRouter;