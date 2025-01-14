import User from "./models/users.model.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";


User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Order, { foreignKey: "productId" });
Order.belongsTo(Product, { foreignKey: "productId" });


const syncModels = async () => {
    try {
        await User.sync({ force: true });
        await Product.sync({ force: true });
        await Order.sync({ force: true });
        console.log("Models synced successfully.");
    } catch (error) {
        console.error("Error syncing models:", error);
    }
};

export default syncModels;