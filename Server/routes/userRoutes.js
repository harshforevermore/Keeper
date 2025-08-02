import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import { getUsername } from '../controllers/userDataController.js';

const router = express.Router();

//routes
router.post("/register", registerUser);
router.post('/login', loginUser);
router.post("/getUsername", getUsername);

export default router;