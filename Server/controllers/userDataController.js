import { getUsernameWithPublicId } from "../models/userModel.js";

export const getUsername = async (req, res) => {
    const {publicId} = req.body;
    if(!publicId) {
        return res.status(400).json({message: "Invalid Public Id"});
    }
    try{
        const data = await getUsernameWithPublicId(publicId);
        if(!data) {
            return res.status(500).json({message: "Something went wrong!"});
        }
        return res.status(201).json({username: data.username, message: "username successfully sent"});
    }
    catch(error) {
        console.log("Error occured while getting the username: ", error.message);
    }
};