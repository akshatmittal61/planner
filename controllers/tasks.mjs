import Task from "../models/Task.mjs";

const getAllTaks = async (req, res) => {
	try {
		const allTasks = await Task.find({ user: req.user.id }).sort({
			date: -1,
		});
		return res.status(200).json(allTasks);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

export { getAllTaks };
