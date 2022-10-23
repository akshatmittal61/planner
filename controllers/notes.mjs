import List from "../models/List.mjs";
import Note from "../models/Note.mjs";

const getList = async (id) => {
	let Id = id.toString();
	try {
		const foundList = await List.findById(Id);
		return foundList;
	} catch (error) {
		console.error(error);
		return undefined;
	}
};

const getAllNotes = async (req, res) => {
	try {
		const allNotes = await Note.find({ user: req.user.id });
		let notesToSend = [];
		for (let note of allNotes) {
			let listsToSend = [];
			for (const list of note?.lists) {
				const res = await getList(list);
				listsToSend.push(res);
			}
			let noteToPush = { ...note.toObject(), lists: listsToSend };
			notesToSend.push(noteToPush);
		}
		return res.status(200).json({ allNotes: notesToSend });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const getAllLists = async (req, res) => {
	try {
		const lists = await List.find({ user: req.user.id });
		return res.status(200).json({ lists: lists });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const createList = async (req, res) => {
	try {
		const { title, color, description } = req.body;
		if (!title) return res.status(400).json({ message: "Invalid Data" });
		const newList = new List({
			user: req.user.id,
			title,
			color,
			description,
		});
		const list = await newList.save();
		return res.status(201).json({ list: list });
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
		let listsToSend = [];
		for (const list of foundNote?.lists) {
			const res = await getList(list);
			listsToSend.push(res);
		}
		let noteToSend = { ...foundNote.toObject(), lists: listsToSend };
		return res.status(200).json(noteToSend);
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
		console.error(error);
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

const addNoteToList = async (req, res) => {
	const { noteId } = req.body;
	const listId = req.params?.id;
	try {
		const list = await List.findById(listId);
		if (!list) return res.status(404).json({ message: "List not found" });
		if (list.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		const note = await Note.findById(noteId);
		if (!note) return res.status(404).json({ message: "Note not found" });
		if (note.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (list.notes.includes(noteId) || note.lists.includes(listId))
			return res.status(400).json({ message: "Note already in list" });
		list.notes.push(noteId);
		note.lists.push(listId);
		await list.save();
		await note.save();
		return res.status(200).json({ message: "Added note to list" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const removeNoteFromList = async (req, res) => {
	const { noteId } = req.body;
	const listId = req.params.id;
	try {
		const list = await List.findById(listId);
		if (!list) return res.status(404).json({ message: "List not found" });
		if (list.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		const note = await Note.findById(noteId);
		if (!note) return res.status(404).json({ message: "Note not found" });
		if (note.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (!list.notes.includes(noteId) || !note.lists.includes(listId))
			return res.status(400).json({ message: "Note not in list" });
		list.notes = list.notes.filter((note) => note.toString() !== noteId);
		note.lists = note.lists.filter((list) => list.toString() !== listId);
		await list.save();
		await note.save();
		return res.status(200).json({ message: "Removed note from list" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const getNotesInList = async (req, res) => {
	const listId = req.params.id;
	try {
		const list = await List.findById(listId);
		if (!list) return res.status(404).json({ message: "List not found" });
		if (list.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		const notes = await Note.find({ _id: { $in: list.notes } });
		let notesToSend = [];
		for (let note of notes) {
			let listsToSend = [];
			for (const list of note?.lists) {
				const res = await getList(list);
				listsToSend.push(res);
			}
			let noteToPush = { ...note.toObject(), lists: listsToSend };
			notesToSend.push(noteToPush);
		}
		return res.status(200).json({ notes: notesToSend });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "List not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const getListsForNote = async (req, res) => {
	const noteId = req.params.id;
	try {
		const note = await Note.findById(noteId);
		if (!note) return res.status(404).json({ message: "Note not found" });
		if (note.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		const lists = await List.find({ _id: { $in: note.lists } });
		let listsToSend = [];
		for (const list of lists) {
			const res = await getList(list);
			listsToSend.push(res);
		}
		return res.status(200).json({ lists: listsToSend });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const editList = async (req, res) => {
	const { ...updatedFields } = req.body;
	const listId = req.params.id;
	try {
		const list = await List.findById(listId);
		if (!list) return res.status(404).json({ message: "List not found" });
		if (list.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		const updatedList = await List.findByIdAndUpdate(
			listId,
			{ $set: updatedFields },
			{ new: true }
		);
		return res
			.status(200)
			.json({ message: "List updated", list: updatedList });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "List not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const deleteList = async (req, res) => {
	const listId = req.params.id;
	try {
		const list = await List.findById(listId);
		if (!list) return res.status(404).json({ message: "List not found" });
		if (list.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		await List.findByIdAndDelete(listId);
		const notes = await Note.find({ _id: { $in: list.notes } });
		for (let note of notes) {
			if (note.lists.includes(listId)) {
				note.lists = note.lists.filter(
					(list) => list.toString() !== listId
				);
				await note.save();
			}
		}
		return res.status(200).json({ message: "List deleted" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "List not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const archiveNote = async (req, res) => {
	const id = req.params.id;
	try {
		let foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (foundNote.trashed)
			return res
				.status(400)
				.json({ message: "Cannot archive a trashed note" });
		if (foundNote.archived)
			return res.status(400).json({ message: "Note already archived" });
		let updatedNote = await Note.findByIdAndUpdate(
			id,
			{
				$set: { archived: true },
			},
			{ new: true }
		);
		return res
			.status(200)
			.json({ updatedNote: updatedNote, message: "Note archived" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const unArchiveNote = async (req, res) => {
	const id = req.params.id;
	try {
		let foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (foundNote.trashed)
			return res
				.status(400)
				.json({ message: "Cannot unarchive a trashed note" });
		if (!foundNote.archived)
			return res
				.status(400)
				.json({ message: "Note not found in archives" });
		let updatedNote = await Note.findByIdAndUpdate(
			id,
			{
				$set: { archived: false },
			},
			{ new: true }
		);
		return res
			.status(200)
			.json({ updatedNote: updatedNote, message: "Note unarchived" });
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
	getAllLists,
	getNote,
	createList,
	addNoteToList,
	removeNoteFromList,
	getNotesInList,
	getListsForNote,
	editList,
	deleteList,
	addNote,
	editNote,
	archiveNote,
	unArchiveNote,
	moveNoteToTrash,
	restoreNoteFromTrash,
	deleteNote,
};
