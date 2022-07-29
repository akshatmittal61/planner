import mongoose from "mongoose";

let a = new Date();

const TaskSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		color: {
			type: String,
			default: "bgcolor",
		},
		date: {
			type: Date,
			default: Date.now,
		},
		time: {
			type: String,
			default: `${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`,
		},
		done: {
			type: Boolean,
			default: false,
		},
		trashed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Task = mongoose.model("task", TaskSchema);
export default Task;
