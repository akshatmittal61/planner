import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
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

const Profile = mongoose.model("profile", ProfileSchema);
export default Profile;
