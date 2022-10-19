import { Router } from "express";
import {
	addNote,
	addNoteToList,
	archiveNote,
	createList,
	deleteNote,
	editNote,
	getAllLists,
	getAllNotes,
	getListsForNote,
	getNote,
	getNotesInList,
	moveNoteToTrash,
	removeNoteFromList,
	restoreNoteFromTrash,
	unArchiveNote,
} from "../controllers/notes.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.use(auth);

// Notes

router.get("/", getAllNotes);

// Lists

router.get("/lists", getAllLists);
router.get("/list/:id", getNotesInList);
router.post("/list", createList);
router.post("/list/:id", addNoteToList);
router.delete("/list/:id", removeNoteFromList);

// Note

router.get("/:id", getNote);
router.get("/:id/lists", getListsForNote);
router.post("/add", addNote);
router.put("/edit/:id", editNote);
router.put("/archive/:id", archiveNote);
router.put("/unarchive/:id", unArchiveNote);
router.put("/trash/:id", moveNoteToTrash);
router.put("/restore/:id", restoreNoteFromTrash);
router.delete("/delete/:id", deleteNote);

export default router;
