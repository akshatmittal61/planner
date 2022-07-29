import { model, Schema } from "mongoose";

const NoteSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
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
	},
	{
		timestamps: true,
	}
);

const Note = model("note", NoteSchema);
export default Note;
