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

router.use(auth);
router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post("/add", addEvent);
router.put("/edit/:id", editEvent);
router.delete("/delete/:id", deleteEvent);

export default router;
