import { pool } from "../config/db.js";
import { compareHashedPasswords } from "../utils/passwordUtils.js";

export const createUser = async (
  public_id,
  username,
  email,
  hashedPassword
) => {
    try{
        const result = await pool.query(
            "INSERT INTO users(public_id, username, email, password) VALUES($1, $2, $3, $4) RETURNING id",
            [public_id, username, email, hashedPassword]
        );
        return result.rows;
    }
    catch(error) {
        console.error("Error occured while creating the user: ", error.message);
    }
};

export const findUserByEmail = async (email) => {
    try {
        const result = await pool.query("SELECT username FROM users WHERE email = $1", [email]);
        return result.rows[0];
    } catch (error) {
        console.error("Error occured while finding user: ", error.message);
    }
};

export const checkUsernameExists = async (username) => {
    try {
        const isUser = await pool.query("SELECT id, public_id, email FROM users WHERE username = $1", [username]);
        return isUser.rows[0];
    }
    catch(error) {
        console.error("Error while finding username: ", error.message);
    }
}

export const matchPassWithUsername = async (username, password) => {
    try{
        const getPass = await pool.query("SELECT password FROM users WHERE username = $1", [username]);
        const comparePass = compareHashedPasswords(password, getPass.rows[0].password);
        return comparePass;
    }
    catch(error) {
        console.error("Error while comparing password for the username: ", error.message);
    }
};

export const deleteRecentlycreatedUser = async (public_id) => {
    try{
        const result = await pool.query("DELETE FROM users WHERE pubilc_id = $1", [public_id]);
        return result.rowCount > 0;
    }
    catch(error) {
        console.error("Error occured while deleting the user: ", error.message);
    }
};