import User from "../models/userModel.js"; // MongoDB User model


export const getUserDetails = async (req, res) => {
    const mongoId = req.user._id;

    try {
        const user= await User.findById(mongoId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Fetched user:", user);
        res.status(200).json(user);

        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};