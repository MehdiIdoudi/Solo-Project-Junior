import Product from "../databases/models/product.model.js"


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl } = req.body;
        if (!name || !price || !stock) {
            return res.status(400).json({ message: "data is messing." });
        }
        const newProduct = await Product.create({
            name,
            description,
            price,
            stock,
            imageUrl,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "cant create product." });
    }
}

export const getAllProducts = async (req, res) => {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            console.error("Error getting the data:", error);
            res.status(500).json({ message: "cant get the data ." });
        }
    
}

export const updateOne  = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, stock, imageUrl } = req.body;
    try{
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        product.name = name 
        product.description = description 
        product.price = price 
        product.stock = stock 
        product.imageUrl = imageUrl 

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "cant update product." });
    }
    
}
export const deleteOne = async() => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: "product not found." });
        }

        await product.destroy();
        res.status(204).json({ message: "product deleted successFully." });
    } catch (error) {
        console.error("Error when deleting product:", error);
        res.status(500).json({ message: "Failed to delete the product." });
    }
}