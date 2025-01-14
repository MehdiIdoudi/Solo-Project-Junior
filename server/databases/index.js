import { Sequelize } from "sequelize";

const connection = new Sequelize("gamer_gear", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});

const connectionVerify = async () => {
    try {
        await connection.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

connectionVerify();

export default connection;