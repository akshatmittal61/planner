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

const getTask = async (req, res) => {
	const id = req.params.id;
	try {
		const foundTask = await Task.findById(id);
		if (!foundTask)
			return res.status(404).json({ message: "Task not found" });
		if (foundTask.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		return res.status(200).json({ foundTask });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Task Not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

export { getAllTaks, getTask };
