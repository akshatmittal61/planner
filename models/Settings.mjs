import { model, Schema } from "mongoose";

const SettingsSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
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

const Settings = model("settings", SettingsSchema);
export default Settings;
