import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { config } from "dotenv";
import connect from "./db/index.mjs";
import { PORT } from "./config/index.mjs";
import apiAuth from "./routes/auth.mjs";
import apiSettings from "./routes/settings.mjs";
import apiEvents from "./routes/events.mjs";
import apiNotes from "./routes/notes.mjs";
import apiTasks from "./routes/tasks.mjs";
import apiNotify from "./routes/notification.mjs";
import { fileURLToPath } from "url";
import webPush from "web-push";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
config();
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", apiAuth);
app.use("/api/settings", apiSettings);
app.use("/api/events", apiEvents);
app.use("/api/notes", apiNotes);
app.use("/api/tasks", apiTasks);
app.use("/api/notifications", apiNotify);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "build", "index.html"));
	});
}

app.listen(PORT, () => {
	webPush.setVapidDetails(
		process.env.WEB_PUSH_CONTACT,
		process.env.PUBLIC_VAPID_KEY,
		process.env.PRIVATE_VAPID_KEY
	);
	connect();
	console.log(`Server started at port ${PORT}`);
});
