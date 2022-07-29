import { model, Schema } from "mongoose";

const ProfileSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		status: {
			type: String,
		},
		bio: {
			type: String,
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Rather Not Say"],
			default: "Male",
		},
		avatar: {
			type: String,
			default:
				"https://raw.githubusercontent.com/akshatmittal61/planner/master/src/images/user.svg",
		},
	},
	{ timestamps: true }
);

const Profile = model("profile", ProfileSchema);
export default Profile;
