import Settings from "../models/Settings.mjs";

const getAccentColor = async (req, res) => {
	const id = req.user.id;
	try {
		const settings = await Settings.findOne({ user: id });
		if (!settings)
			return res
				.status(404)
				.json({ massage: "Unablt to process your query" });
		if (settings.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not Authorized" });
		return res.status(200).json({ accentColor: settings.accentColor });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

export { getAccentColor };
