import React, { useState } from "react";
import Input, { TextArea } from "../../components/Input/Input";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";

const AddTask = ({ close }) => {
	const [newTask, setNewTask] = useState({
		title: "",
		description: "",
		date: "",
		time: "",
		color: "bgcolor",
		done: false,
		trashed: false,
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewTask((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = (e) => {
		e?.preventDefault();
		console.log(newTask);
		setNewTask({
			title: "",
			description: "",
			date: "",
			time: "",
			done: false,
			trashed: false,
		});
		close();
	};
	const handleReset = (e) => {
		e?.preventDefault();
		setNewTask({
			title: "",
			description: "",
			date: "",
			time: "",
			done: false,
			trashed: false,
		});
	};
	return (
		<Dialog
			close={close}
			title="Add a new Task"
			cta={{ text: "Add Task", action: handleSubmit }}
		>
			<form
				className="add-task-form"
				onReset={handleReset}
				onSubmit={handleSubmit}
			>
				<Input
					name="title"
					placeholder="Task Title"
					icon="edit"
					type="text"
					autoFocus
					value={newTask.title}
					onChange={handleChange}
				/>
				<TextArea
					name="description"
					placeholder="Task Description"
					icon="notes"
					type="text"
					value={newTask.description}
					onChange={handleChange}
				/>
				<Row>
					<Col lg={50} md={50} sm={100}>
						<Input
							name="date"
							placeholder="Due Date"
							icon="calendar_month"
							type="date"
							autoFocus
							value={newTask.date}
							onChange={handleChange}
						/>
					</Col>
					<Col lg={50} md={50} sm={100}>
						<Input
							name="time"
							placeholder="Due Time"
							icon="schedule"
							type="time"
							autoFocus
							value={newTask.time}
							onChange={handleChange}
						/>
					</Col>
				</Row>
			</form>
		</Dialog>
	);
};

export default AddTask;
