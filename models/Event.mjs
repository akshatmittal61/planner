import { model, Schema } from "mongoose";

const EventSchema = new Schema(
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
			default: `${Date.prototype.getHours()}:${Date.prototype.getMinutes()}:${Date.prototype.getSeconds()}`,
		},
		trashed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Event = model("event", EventSchema);
export default Event;
