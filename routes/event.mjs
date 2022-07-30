import { Router } from "express";
import {
	addEvent,
	editEvent,
	getAllEvents,
	getEvent,
} from "../controllers/event.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/", auth, getAllEvents);
router.get("/:id", auth, getEvent);
router.post("/add", auth, addEvent);
router.put("/edit/:id", auth, editEvent);

export default router;
