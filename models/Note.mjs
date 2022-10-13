import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
		},
		content: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: "bgcolor",
		},
		archived: {
			type: Boolean,
			default: false,
		},
		trashed: {
			type: Boolean,
			default: false,
		},
		image: {
			type: Number,
			default: -1,
		},
		lists: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "List",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Note = mongoose.model("note", NoteSchema);
export default Note;
