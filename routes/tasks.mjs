import { Router } from "express";
import {
	addTask,
	deteleTask,
	editTask,
	getAllTaks,
	getTask,
	markAsDone,
	markAsNotDone,
} from "../controllers/tasks.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.use(auth);
router.get("/", getAllTaks);
router.get("/:id", getTask);
router.post("/add", addTask);
router.put("/edit/:id", editTask);
router.put("/mark-as-done/:id", markAsDone);
router.put("/mark-as-not-done/:id", markAsNotDone);
router.delete("/delete/:id", deteleTask);

export default router;
