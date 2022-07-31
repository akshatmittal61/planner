import { Router } from "express";
import { getAccentColor } from "../controllers/settings.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/accentcolor", auth, getAccentColor);

export default router;
