import Note from "../models/Note.mjs";

const getAllNotes = async (req, res) => {
	try {
		const allNotes = await Note.find({ user: req.user.id });
		return res.status(200).json({ allNotes: allNotes });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const getNote = async (req, res) => {
	const id = req.params.id;
	try {
		const foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		return res.status(200).json(foundNote);
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const addNote = async (req, res) => {
	const { title, content, color, image, archived } = req.body;
	if (!title || !content || !color)
		return res.status(400).json({ message: "Invalid Data" });
	try {
		const newNote = new Note({
			user: req.user.id,
			title,
			content,
			color,
			image,
			archived,
		});
		const note = await newNote.save();
		return res
			.status(200)
			.json({ newNote: note, message: "Added note successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const editNote = async (req, res) => {
	const id = req.params.id;
	try {
		const { ...updatedFields } = req.body;
		let foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		let updatedNote = await Note.findByIdAndUpdate(
			id,
			{ $set: updatedFields },
			{ new: true }
		);
		return res.status(200).json({
			updatedNote: updatedNote,
			message: "Updated note successfully",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const moveNoteToTrash = async (req, res) => {
	const id = req.params.id;
	try {
		let foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (foundNote.trashed)
			return res.status(400).json({ message: "Note already in trash" });
		let updatedNote = await Note.findByIdAndUpdate(
			id,
			{
				$set: { trashed: true },
			},
			{ new: true }
		);
		return res
			.status(200)
			.json({ updatedNote: updatedNote, message: "Note moved to Trash" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const restoreNoteFromTrash = async (req, res) => {
	const id = req.params.id;
	try {
		let foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (!foundNote.trashed)
			return res.status(400).json({ message: "Note not in trash" });
		let updatedNote = await Note.findByIdAndUpdate(
			id,
			{
				$set: { trashed: false },
			},
			{ new: true }
		);
		return res.status(200).json({
			updatedNote: updatedNote,
			message: "Note restored",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const deleteNote = async (req, res) => {
	const id = req.params.id;
	try {
		const note = await Note.findById(id);
		if (!note) return res.status(404).json({ message: "Note not found" });
		if (note.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		await note.remove();
		return res.status(200).json({ message: "Note deleted" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Noet not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

export {
	getAllNotes,
	getNote,
	addNote,
	editNote,
	moveNoteToTrash,
	restoreNoteFromTrash,
	deleteNote,
};
