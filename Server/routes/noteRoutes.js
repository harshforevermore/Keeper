import express from 'express';
import { createNewNote } from '../controllers/noteController';

const router = express.Router();

router.post("/note/newNote", createNewNote);

export default router;