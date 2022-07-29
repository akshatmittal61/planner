import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		theme: {
			type: String,
			enum: ["light", "dark"],
			default: "light",
		},
		fontSize: {
			type: Number,
			default: 16,
		},
		accentColor: {
			type: String,
			default: "indigo",
		},
		sendPushNotifications: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

const Settings = mongoose.model("settings", SettingsSchema);
export default Settings;
