import express from "express";
import { createNote,deletenote,getAllNotes, updateNote, getNotebyid } from "../controllers/notesControllers.js";

const router  = express.Router();

router.get("/",getAllNotes);
router.get("/:id",getNotebyid);
router.post("/", createNote)
router.put("/:id", updateNote);
router.delete("/:id", deletenote);

export default router;

