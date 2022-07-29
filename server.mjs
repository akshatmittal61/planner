import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connect from "./db/index.mjs";
import { PORT } from "./config/index.mjs";
import apiAuth from "./routes/auth.mjs";
import apiEvent from "./routes/event.mjs";

config();
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send("Hello World");
});
app.use("/api/auth", apiAuth);
app.use("/api/event", apiEvent);

app.listen(PORT, () => {
	connect();
	console.log(`Server started at port ${PORT}`);
});
