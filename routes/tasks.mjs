import { Router } from "express";
import { getAllTaks } from "../controllers/tasks.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/", auth, getAllTaks);

export default router;
