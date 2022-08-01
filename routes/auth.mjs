import { Router } from "express";
import { editProfile, login, register } from "../controllers/auth.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/edit", auth, editProfile);

export default router;
