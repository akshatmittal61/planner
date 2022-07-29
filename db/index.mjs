import mongoose from "mongoose";
import { dbUri } from "../config/index.mjs";

const connect = async () => {
	return mongoose
		.connect(dbUri)
		.then(() => {
			console.log("Connected to MongoDB successfuly.");
		})
		.catch((err) => {
			console.log(err.message);
			process.exit(1);
		});
};

export default connect;
