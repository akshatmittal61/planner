import { Router } from "express";
import {
	addEvent,
	deleteEvent,
	editEvent,
	getAllEvents,
	getEvent,
} from "../controllers/events.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/", auth, getAllEvents);
router.get("/:id", auth, getEvent);
router.post("/add", auth, addEvent);
router.put("/edit/:id", auth, editEvent);
router.delete("/delete/:id", auth, deleteEvent);

export default router;
