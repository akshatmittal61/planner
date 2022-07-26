import React, { useState } from "react";
import IconButton from "../../components/Button/IconButton";
import Input, { TextArea } from "../../components/Input/Input";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";
import { colors } from "../../utils";

const AddTask = ({ close }) => {
	const [openColorBox, setOpenColorBox] = useState(false);
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
			color={newTask.color}
			title="Add a new Task"
			cta={{ text: "Add Task", action: handleSubmit }}
			bodyStyle={{
				backgroundColor: `var(--${newTask.color}-100)`,
			}}
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
				<div
					className="form-group"
					style={{ justifyContent: "flex-start" }}
				>
					<div className="add-task-form-group">
						<IconButton
							fill={`var(--${newTask.color}-400)`}
							icon="palette"
							onClick={(e) => {
								e.preventDefault();
								setOpenColorBox(true);
							}}
						/>
						{openColorBox && (
							<>
								<div className="add-task-color-box">
									<Row>
										{colors.map((thisColor, index) => (
											<Col
												lg={25}
												md={25}
												sm={33}
												key={index}
											>
												<button
													style={{
														width: "2rem",
														height: "2rem",
														backgroundColor: `var(--${thisColor})`,
														borderRadius: "500px",
														margin: "0.5rem",
													}}
													onClick={(e) => {
														e.preventDefault();
														setNewTask((p) => ({
															...p,
															color: thisColor,
														}));
														setOpenColorBox(false);
													}}
												></button>
											</Col>
										))}
									</Row>
								</div>
							</>
						)}
					</div>
				</div>
			</form>
		</Dialog>
	);
};

export default AddTask;
