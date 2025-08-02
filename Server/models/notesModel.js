import {pool} from '../config/db.js';

export const insertNewNote = async (title, desc, user_id) => {
    try {
        const result = await pool.query("INSERT INTO notes (user_id, title, description) VALUES($1, $2, $3)", [user_id, title, desc]);
        return result.rows;
    }
    catch(error) {
        console.error("Error occured while inserting the note in the db: ", error.message);
    }
};