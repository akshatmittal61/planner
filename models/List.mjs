import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: "bgcolor",
		},
		poster: {
			type: Number,
			default: -1,
		},
		description: {
			type: String,
		},
		notes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Note",
			},
		],
	},
	{
		timestamps: true,
	}
);

const List = mongoose.model("list", ListSchema);
export default List;
