import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		accentColor: {
			type: String,
			default: "indigo",
		},
		trashDuration: {
			type: Number,
			default: 30,
		},
	},
	{
		timestamps: true,
	}
);

const Settings = mongoose.model("settings", SettingsSchema);
export default Settings;
