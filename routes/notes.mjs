import { Router } from "express";
import {
	addNote,
	deleteNote,
	editNote,
	getAllNotes,
	getNote,
} from "../controllers/notes.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/", auth, getAllNotes);
router.get("/:id", auth, getNote);
router.post("/add", auth, addNote);
router.put("/edit/:id", auth, editNote);
router.delete("/delete/:id", auth, deleteNote);

export default router;
