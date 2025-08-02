import {
  checkUsernameExists,
  createUser,
  deleteRecentlycreatedUser,
  findUserByEmail,
  matchPassWithUsername,
} from "../models/userModel.js";
import { generatePublicId } from "../utils/userUtilityFunctions.js";
import { generateHashedPassword } from "../utils/passwordUtils.js";
import {
  generateNewAccessToken,
  generateNewRefreshToken,
} from "../utils/tokenUtils.js";
import { deleteRefreshToken, insertRefreshToken } from "../models/tokenModel.js";
import dotenv from "dotenv";

dotenv.config();


export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("username: ", username);
  console.log("email: ", email);
  console.log("password: ", password);

  try {
    // 1. Check if user already exists
    const emailAlreadyExist = await findUserByEmail(email);
    const usernameAlreadyExist = await checkUsernameExists(username);
    if (emailAlreadyExist || usernameAlreadyExist) {
      return res.status(401).json({ message: "User already exists" });
    }

    // 2. Insert new user
    const public_id = generatePublicId();
    const hashedPassword = await generateHashedPassword(password);
    const newUser = await createUser(public_id, username, email, hashedPassword);
    console.log(newUser);
    if (!newUser) {
      return res.status(400).json({ message: "Something went wrong, try again" });
    }

    // 3. Generate tokens
    const refresh_token = generateNewRefreshToken(public_id, email);
    const access_token = generateNewAccessToken(public_id, email);

    // 4. Save refresh token
    const result = await insertRefreshToken(newUser[0].id, refresh_token);

    if (!result) {
      await deleteRecentlycreatedUser(public_id); // cleanup
      return res.status(500).json({ message: "Error saving token, try again" });
    }

    // 5. Set access token cookie (before res.json)
    res.cookie("accessToken", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    // 6. Send response
    return res.status(201).json({ publicId: public_id, message: "Successfully Registered!" });

  } catch (error) {
    console.error("Error while registering user:", error.message);
    return res.status(500).json({ message: "Internal Server Error, please try again" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await checkUsernameExists(username);
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist!" });
    }
    
    // 2. Check password
    const isPassMatch = await matchPassWithUsername(username, password);
    if (!isPassMatch) {
      return res.status(401).json({ message: "Wrong password!" });
    }
    
    // 3. Delete old refresh token
    await deleteRefreshToken(user.id);

    // 4. Generate new tokens
    const refreshToken = generateNewRefreshToken(user.public_id, user.email);
    const accessToken = generateNewAccessToken(user.public_id, user.email);

    // 5. Store new refresh token in the database
    const saved = await insertRefreshToken(user.id, refreshToken);
    if (!saved) {
      return res.status(500).json({ message: "Error saving refresh token" });
    }

    // 6. Set access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    // 7. Success response
    return res
    .status(200)
    .json({ publicId: user.public_id, message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error, please try again" });
    }
};