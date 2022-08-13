import Event from "../models/Event.mjs";

const getAllEvents = async (req, res) => {
	try {
		const allEvents = await Event.find({ user: req.user.id }).sort({
			date: -1,
		});
		return res.status(200).json({ allEvents: allEvents });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const getEvent = async (req, res) => {
	const id = req.params.id;
	try {
		const foundEvent = await Event.findById(id);
		if (!foundEvent)
			return res.status(404).json({ message: "Event not found" });
		if (foundEvent.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		return res.status(200).json({ event: foundEvent });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Event not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const addEvent = async (req, res) => {
	const { title, description, type, link, date, time } = req.body;
	if (!title || !description || !type || !date || !time)
		return res.status(400).json({ message: "Invalid Data" });
	try {
		const newEvent = new Event({
			user: req.user.id,
			title,
			description,
			type,
			link,
			date,
			time,
		});
		const event = await newEvent.save();
		return res
			.status(200)
			.json({ newEvent: event, message: "Added event succesfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const editEvent = async (req, res) => {
	const id = req.params.id;
	try {
		const { ...updatedFields } = req.body;
		let foundEvent = await Event.findById(id);
		if (!foundEvent)
			return res.status(404).json({ message: "Event not found" });
		if (foundEvent.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		let updatedEvent = await Event.findByIdAndUpdate(
			id,
			{
				$set: updatedFields,
			},
			{ new: true }
		);
		return res.status(200).json({
			updatedEvent: updatedEvent,
			message: "Updated event successfuly",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Event not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const moveEventToTrash = async (req, res) => {
	const id = req.params.id;
	try {
		let foundEvent = await Event.findById(id);
		if (!foundEvent)
			return res.status(404).json({ message: "Event not found" });
		if (foundEvent.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (foundEvent.trashed)
			return res.status(400).json({ message: "Event already in trash" });
		let updatedEvent = await Event.findByIdAndUpdate(
			id,
			{
				$set: { trashed: true },
			},
			{ new: true }
		);
		return res.status(200).json({
			updatedEvent: updatedEvent,
			message: "Event moved to Trash",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Event not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const restoreEventFromTrash = async (req, res) => {
	const id = req.params.id;
	try {
		let foundEvent = await Event.findById(id);
		if (!foundEvent)
			return res.status(404).json({ message: "Event not found" });
		if (foundEvent.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (!foundEvent.trashed)
			return res.status(400).json({ message: "Event not in trash" });
		let updatedEvent = await Event.findByIdAndUpdate(
			id,
			{
				$set: { trashed: false },
			},
			{ new: true }
		);
		return res.status(200).json({
			updatedEvent: updatedEvent,
			message: "Event restored",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Event not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const deleteEvent = async (req, res) => {
	const id = req.params.id;
	try {
		const event = await Event.findById(id);
		if (!event) return res.status(404).json({ message: "Event not found" });
		if (event.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		await event.remove();
		return res.status(200).json({ message: "Event deleted" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Event not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

export {
	getAllEvents,
	getEvent,
	addEvent,
	editEvent,
	moveEventToTrash,
	restoreEventFromTrash,
	deleteEvent,
};
