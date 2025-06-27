import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pkg;

export const pool = new Pool({
    connectionString: process.env.DB_URL
});

export const connectDB = async () => {
    try {
        await pool.query("SELECT NOW();");
        console.log("Database Connected ✅");
    }
    catch(err) {
        console.error("Error connecting to the database! ", err.message);
        process.exit(1);
    }
    
};