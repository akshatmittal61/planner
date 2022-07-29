import { model, Schema } from "mongoose";

const TaskSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
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
			default: `${Date.prototype.getHours()}:${Date.prototype.getMinutes()}:${Date.prototype.getSeconds()}`,
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

const Task = model("task", TaskSchema);
export default Task;
