import { Router } from "express";
import { addNote, getAllNotes, getNote } from "../controllers/notes.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/", auth, getAllNotes);
router.get("/:id", auth, getNote);
router.post("/add", auth, addNote);

export default router;
