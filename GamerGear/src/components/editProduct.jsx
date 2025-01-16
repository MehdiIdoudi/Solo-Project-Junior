import { useState } from "react";
import axios from "axios";

function EditProduct() {
    const [product, setProduct] = useState({name: "",description: "",price: "", stock: "",imageUrl: ""});
    const [productId, setProductId] = useState(""); 

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/products/addProduct", product);
            console.log("Product created:", response.data);
            alert("Product created successfully");
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product.");
        }
    };

    const handleUpdate = async () => {
        if (!productId) {
            alert("no product id.");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:3001/api/products/updateProduct/${productId}`, product);
            console.log("Product updated:", response.data);
            alert("Product updated successfully!");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product.");
        }
    };

    const handleDelete = async () => {
        if (!productId) {
            alert("product id messing.");
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:3001/api/products/deleteProduct/${productId}`);
            console.log("Product deleted:", response.data);
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };

    return (
        <div className="div-edit-container">
            <label className="label-edit">
                <h4 className="text-h5">Product Name:</h4>
                <input className="inputs-fields" type="text" value={product.name} name="name" onChange={handleInputs} />
            </label>
            <label className="label-edit">
                <h4 className="text-h5">Description:</h4>
                <input type="text" className="inputs-fields" name="description" value={product.description} onChange={handleInputs} />
            </label>
            <label  className="label-edit">
                <h4 className="text-h5">Price:</h4>
                <input type="number" className="inputs-fields" value={product.price} name="price" onChange={handleInputs} />
            </label>
            <label  className="label-edit">
                <h4 className="text-h5">Stock:</h4>
                <input type="number" className="inputs-fields" name="stock" value={product.stock} onChange={handleInputs} />
            </label>
            <label  className="label-edit">
                <h4 className="text-h5">Image URL:</h4>
                <input type="text" className="inputs-fields" name="imageUrl" value={product.imageUrl} onChange={handleInputs} />
            </label>

            <label  className="label-edit">
                <h4 className="text-h5">Product ID (for update/delete):</h4>
                <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
            </label>

            <input type="button" className="btn-edit" id="btn-1" value="Create" onClick={handleCreate} />
            <input type="button" className="btn-edit" id="btn-2" value="Update" onClick={handleUpdate} />
            <input type="button" className="btn-edit" id="btn-3" value="Delete" onClick={handleDelete} />
        </div>
    );
}

export default EditProduct;
