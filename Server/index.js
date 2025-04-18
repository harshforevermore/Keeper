import express from "express";
// import pg from 'pg';
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import pkg from "pg";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const { Pool } = pkg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//API paths
app.post("/login/submit", async (req, res) => {
  try {
    const { username, password } = req.body;
    const db_req = await pool.query(
      "SELECT * FROM users WHERE username= $1 AND password= $2",
      [username, password]
    );
    if (db_req.rowCount > 0) {
      res.json({ exists: true, user: [db_req.rows[0]] });
    } else {
      res.json({ exists: false, message: "User not found!" });
    }
  } catch (err) {
    console.error("Error: ", err.message);
  }
});
app.post("/register/submit", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.compare(password, 10);
    console.log("hashedPassword: ", hashedPassword);
    const db_req = await pool.query(
      "INSERT INTO users(username, email, password) VALUES($1, $2, $3)",
      [username, email, hashedPassword]
    );
    console.log(db_req);
    res.json({data: "req sent"});
  } catch (err) {
    console.error("Error: ", err.message);
  }
});
app.listen(port, () => {
  try {
    console.log(`server running on port ${port}`);
  } catch (err) {
    console.error("Error occured while starting server: ", err);
  }
});
