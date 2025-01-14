import connection from "../index.js";
import { DataTypes } from "sequelize";

const User = connection.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    cardDetails: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: { items: [], total: 0 },
    },
});

export default User;