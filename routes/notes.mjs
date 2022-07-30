import { Router } from "express";
import { getAllNotes, getNote } from "../controllers/notes.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/", auth, getAllNotes);
router.get("/:id", auth, getNote);

export default router;
