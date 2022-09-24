import { Router } from "express";
import { editSettings, getSettings } from "../controllers/settings.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/", auth, getSettings);
router.put("/edit", auth, editSettings);

export default router;
