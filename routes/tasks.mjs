import { Router } from "express";
import {
	addTask,
	deteleTask,
	editTask,
	getAllTaks,
	getTask,
} from "../controllers/tasks.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/", auth, getAllTaks);
router.get("/:id", auth, getTask);
router.post("/add", auth, addTask);
router.put("/edit/:id", auth, editTask);
router.delete("/delete/:id", auth, deteleTask);

export default router;
