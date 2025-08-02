import { insertNewNote } from "../models/notesModel";

export const createNewNote = async (req, res) => {
    const {title, desc, public_id} = req.body;
    if(!title || !desc || !public_id) {
        res.status(400).json({message: "invalid data!"});
    }
    try{
        const result = await insertNewNote(title, desc, public_id);
        if(!result) {
            res.status(500).json({message: "Something went wrong!"});
        }
        res.status(201).json({message: "Note created successfully"});
    }
    catch(error) {
        console.error("error occured while creating a new note: ", error.message);
    }
};