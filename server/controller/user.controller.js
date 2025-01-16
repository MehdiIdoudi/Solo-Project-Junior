import User from "../databases/models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const { username, password, email, cardDetails } = req.body;
    if (!username || !password || !email ) {
        return res.status(400).json({ message: `All fields are required: username, password, email,  cardDetails` });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
            cardDetails,
        });

        const userResponse = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            cardDetails: newUser.cardDetails,
        };

        res.status(201).json({
            message: "User created successfully",
            user: userResponse,
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
};

export const login = async (req,res)=>{
    const {email,password} = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" })}
        try {
            const user = await User.findOne({ where: { email } });
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!user ||!isPasswordValid) {
                return res.status(404).json({ message: "there is mistake in ur user or password  " }); // just for more security  
            }
            const token = jwt.sign(
                { id: user.id, email: user.email },
                "12345", 
                { expiresIn: "100h" } 
            )
            return res.status(200).json({
                message: "Login successFULLY",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
                token,
            })

        }catch (error) {
        res.status(500).json({ message: "Error during login", error: error.message });
    }
        
}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const newData = req.body;
    try {
        const [updatedData] = await User.update(newData, { where: { id: userId } });
        if (updatedData === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await User.findOne({ where: { id: userId } });
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error during updating", error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            cardDetails: user.cardDetails,
        });
    } catch (error) {
        res.status(500).json({ message: "Error getting profile", error: error.message });
    }
};
export const addToCard = async (req, res) => {
    const { cardDetails } = req.body;
    const userId = req.user;
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            console.log('User not found:', userId);
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update({ cardDetails });

        console.log('User updated successfully:', user.id);
        const updatedUser = await User.findByPk(userId);
        console.log('Updated user from database:', updatedUser.cardDetails);

        return res.status(200).json({ message: 'Cart updated successfully', cardDetails });
    } catch (error) {
        console.error('Error updating cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};