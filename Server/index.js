import express, {json} from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(json());
app.use(morgan('dev'));

connectDB();

app.use("/u", userRoutes);

app.listen(process.env.PORT, () => {
  try {
    console.info("Server running at PORT: ", process.env.PORT);
  }
  catch(err) {
    console.error("Error while starting the server: ", err.message);
  }
})