import { Router } from "express";
import {
	addNote,
	deleteNote,
	editNote,
	getAllNotes,
	getNote,
	moveNoteToTrash,
} from "../controllers/notes.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.use(auth);
router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/add", addNote);
router.put("/edit/:id", editNote);
router.put("/trash/:id", moveNoteToTrash);
router.delete("/delete/:id", deleteNote);

export default router;
