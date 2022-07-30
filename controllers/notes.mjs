import Note from "../models/Note.mjs";

const getAllNotes = async (req, res) => {
	try {
		const allNotes = await Note.find({ user: req.user.id });
		return res.status(200).json(allNotes);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

export { getAllNotes };
