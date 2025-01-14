import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(403).send("Not authorized");
    }
    try {
        const data = jwt.verify(token, "12345"); 
        console.log("data", data);
        req.user = data.id;
        next();
    } catch (error) {
        return res.status(401).send("Invalid or expired token");
    }
};
export default verifyToken;