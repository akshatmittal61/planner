import { Router } from "express";
import { getAllNotes } from "../controllers/notes.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/", auth, getAllNotes);

export default router;
