import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";

config();
const app = express();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_CONNECTION_URL);
		console.log("Connected to MongoDB successfuly.");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	connectDB();
	console.log(`Server started at port ${PORT}`);
});
