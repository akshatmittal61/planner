import { Router } from "express";
import { addEvent } from "../controllers/event.mjs";

const router = Router();

router.post("/add", addEvent);

export default router;
