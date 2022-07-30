import Event from "../models/Event.mjs";

const getEvent = async (req, res) => {
	const id = req.params.id;
	try {
		const foundEvent = await Event.findById(id);
		if (!foundEvent)
			return res.status(404).json({ message: "Event not found" });
		return res.status(200).json(foundEvent);
	} catch (error) {
		console.log(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Post not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const addEvent = async (req, res) => {
	const { title, description, type, link, date, time } = req.body;
	if (!title || !description || !type || !link || !date || !time)
		return res.status(500).json({ message: "Invalid Data" });
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
			.json({ event, message: "Added event succesfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

export { getEvent, addEvent };
