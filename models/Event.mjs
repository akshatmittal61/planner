import mongoose from "mongoose";

let a = new Date();

const EventSchema = new mongoose.Schema(
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
		type: {
			type: String,
		},
		link: {
			type: String,
		},
		date: {
			type: Date,
			default: Date.now,
			required: true,
		},
		time: {
			type: String,
			default: `${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`,
		},
		trashed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Event = mongoose.model("event", EventSchema);
export default Event;
