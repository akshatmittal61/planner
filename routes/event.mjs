import { Router } from "express";
import { addEvent } from "../controllers/event.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.post("/add", auth, addEvent);

export default router;
