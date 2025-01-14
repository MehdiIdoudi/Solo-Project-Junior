import connection from "../index.js";
import { DataTypes } from "sequelize";

const Order = connection.define("Order", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
    },
});

export default Order;   