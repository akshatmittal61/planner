import Task from "../models/Task.mjs";

const getAllTaks = async (req, res) => {
	try {
		const allTasks = await Task.find({ user: req.user.id }).sort({
			date: -1,
		});
		return res.status(200).json({ allTasks: allTasks });
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

const addTask = async (req, res) => {
	const { title, description, date, time, color } = req.body;
	if (!title || !description || !color)
		return res.status(400).json({ message: "Invalid Data" });
	try {
		const newTask = new Task({
			user: req.user.id,
			title,
			description,
			color,
			date,
			time,
			done: false,
			trashed: false,
		});
		const task = await newTask.save();
		return res
			.status(200)
			.json({ newTask: task, message: "Added task successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
};

const editTask = async (req, res) => {
	const id = req.params.id;
	try {
		const { ...updatedFields } = req.body;
		let foundTask = await Task.findById(id);
		if (!foundTask)
			return res.status(404).json({ message: "Task not found" });
		if (foundTask.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		let updatedTask = await Task.findByIdAndUpdate(
			id,
			{ $set: updatedFields },
			{ new: true }
		);
		return res.status(200).json({
			updatedTask: updatedTask,
			message: "Updated task successfully",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Task not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const markAsDone = async (req, res) => {
	const id = req.params.id;
	try {
		let foundTask = await Task.findById(id);
		if (!foundTask)
			return res.status(404).json({ message: "Task not found" });
		if (foundTask.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (foundTask.trashed)
			return res
				.status(400)
				.json({ message: "Cannot mark a trashed task as done." });
		if (foundTask.done)
			return res
				.status(400)
				.json({ message: "Task is already marked as done." });
		let updatedTask = await Task.findByIdAndUpdate(
			id,
			{ $set: { done: true } },
			{ new: true }
		);
		return res.status(200).json({
			updatedTask: updatedTask,
			message: "Task marked as done",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Task not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const markAsNotDone = async (req, res) => {
	const id = req.params.id;
	try {
		let foundTask = await Task.findById(id);
		if (!foundTask)
			return res.status(404).json({ message: "Task not found" });
		if (foundTask.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (foundTask.trashed)
			return res
				.status(400)
				.json({ message: "Cannot mark a trashed task as not done." });
		if (!foundTask.done)
			return res
				.status(400)
				.json({ message: "Task is already marked as not done." });
		let updatedTask = await Task.findByIdAndUpdate(
			id,
			{ $set: { done: false } },
			{ new: true }
		);
		return res.status(200).json({
			updatedTask: updatedTask,
			message: "Task marked as not done",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Task not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const moveTaskToTrash = async (req, res) => {
	const id = req.params.id;
	try {
		let foundTask = await Task.findById(id);
		if (!foundTask)
			return res.status(404).json({ message: "Task not found" });
		if (foundTask.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (foundTask.trashed)
			return res.status(400).json({ message: "Task already in trash" });
		let updatedTask = await Task.findByIdAndUpdate(
			id,
			{
				$set: { trashed: true },
			},
			{ new: true }
		);
		return res
			.status(200)
			.json({ updatedTask: updatedTask, message: "Task moved to Trash" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Task not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const restoreTaskFromTrash = async (req, res) => {
	const id = req.params.id;
	try {
		let foundTask = await Task.findById(id);
		if (!foundTask)
			return res.status(404).json({ message: "Task not found" });
		if (foundTask.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (!foundTask.trashed)
			return res.status(400).json({ message: "Task not in trash" });
		let updatedTask = await Task.findByIdAndUpdate(
			id,
			{
				$set: { trashed: false },
			},
			{ new: true }
		);
		return res
			.status(200)
			.json({ updatedTask: updatedTask, message: "Task restored" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Task not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const deteleTask = async (req, res) => {
	const id = req.params.id;
	try {
		const task = await Task.findById(id);
		if (!task) return res.status(404).json({ message: "Task not found" });
		if (task.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		await task.remove();
		return res.status(200).json({ message: "Task deleted" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Task not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

export {
	getAllTaks,
	getTask,
	addTask,
	editTask,
	markAsDone,
	markAsNotDone,
	moveTaskToTrash,
	restoreTaskFromTrash,
	deteleTask,
};
