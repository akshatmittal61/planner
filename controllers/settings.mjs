import Settings from "../models/Settings.mjs";

const getSettings = async (req, res) => {
	const id = req.user.id;
	try {
		const settings = await Settings.findOne({ user: id });
		if (!settings)
			return res
				.status(404)
				.json({ massage: "Unable to process your query" });
		if (settings.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not Authorized" });
		return res.status(200).json(settings);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const editSettings = async (req, res) => {
	const id = req.user.id;
	try {
		const { ...updatedFields } = req.body;
		let foundSettings = await Settings.findOne({ user: id });
		let newSettings;
		if (!foundSettings) {
			newSettings = new Settings({
				accentColor: "indigo",
				trashDuration: 30,
				user: id,
			});
			newSettings.save();
		}
		if (foundSettings.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not Authorized" });
		let updatedSettings = await Settings.findOneAndUpdate(
			{ user: id },
			{ $set: updatedFields },
			{ new: true }
		);
		return res
			.status(200)
			.json({ message: "Updated preferences", updatedSettings });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

export { getSettings, editSettings };
