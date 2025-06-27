import { pool } from "../config/db.js";

export const insertRefreshToken = async (user_id, refresh_token) => { //insert the token to database;
    try{
        const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const result = await pool.query("INSERT INTO refresh_tokens(user_id, token, expires_at) VALUES ($1, $2, $3)", [user_id, refresh_token, expires_at]);
        return result.rowCount > 0;
    }
    catch(error) {
        console.log("Error while inserting refresh token: ", error.message);
    }
};

export const deleteRefreshToken = async (user_id) => {
    try{
        const result = await pool.query("DELETE FROM refresh_tokens WHERE user_id = $1", [user_id]);
        return result.rowCount > 0;
    }
    catch(error) {
        console.error("Error while deleting refresh token: ", error.message);
    }
};