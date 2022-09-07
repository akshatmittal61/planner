import { Router } from "express";
import subscribeForNotification from "../controllers/notification.mjs";

const router = Router();

router.post("/subscribe", subscribeForNotification);

export default router;
