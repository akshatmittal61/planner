import { Router } from "express";
import {
	addNote,
	archiveNote,
	deleteNote,
	editNote,
	getAllNotes,
	getNote,
	moveNoteToTrash,
	restoreNoteFromTrash,
} from "../controllers/notes.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.use(auth);
router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/add", addNote);
router.put("/edit/:id", editNote);
router.put("/archive/:id", archiveNote);
router.put("/trash/:id", moveNoteToTrash);
router.put("/restore/:id", restoreNoteFromTrash);
router.delete("/delete/:id", deleteNote);

export default router;
