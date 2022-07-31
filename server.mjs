import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connect from "./db/index.mjs";
import { PORT } from "./config/index.mjs";
import apiAuth from "./routes/auth.mjs";
import apiEvents from "./routes/events.mjs";
import apiNotes from "./routes/notes.mjs";
import apiTasks from "./routes/tasks.mjs";

config();
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send("Hello World");
});
app.use("/api/auth", apiAuth);
app.use("/api/events", apiEvents);
app.use("/api/notes", apiNotes);
app.use("/api/tasks", apiTasks);

app.listen(PORT, () => {
	connect();
	console.log(`Server started at port ${PORT}`);
});
