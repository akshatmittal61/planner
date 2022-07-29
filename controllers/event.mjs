import Event from "../models/Event.mjs";

const addEvent = async (req, res) => {
	const { title, description, type, link, date, time } = req.body;
	if (!title || !description || !type || !link || !date || !time)
		res.status(500).json({ message: "Invalid Data" });
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
		res.status(200).json({ event, message: "Added event succesfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server Error" });
	}
};

export { addEvent };
