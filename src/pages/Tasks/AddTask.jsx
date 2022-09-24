import React, { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import IconButton from "../../components/Button/IconButton";
import Input, { TextArea } from "../../components/Input/Input";
import Switch from "../../components/Input/Switch";
import GlobalContext from "../../Context/GlobalContext";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";
import { colors } from "../../utils";

const AddTask = ({ close }) => {
	const { addNewTask } = useContext(GlobalContext);
	const [openColorBox, setOpenColorBox] = useState(false);
	const [remindMe, setRemindMe] = useState(false);
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
		addNewTask(newTask);
		close();
	};
	const handleReset = (e) => {
		e?.preventDefault();
		setNewTask({
			title: "",
			description: "",
			date: "",
			time: "",
			color: "bgcolor",
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
					required
					value={newTask.title}
					onChange={handleChange}
				/>
				<TextArea
					name="description"
					placeholder="Task Description"
					icon="notes"
					type="text"
					required
					value={newTask.description}
					onChange={handleChange}
				/>
				{remindMe && (
					<Row>
						<Col lg={50} md={50} sm={100}>
							<Input
								name="date"
								placeholder="Due Date"
								icon="calendar_month"
								type="date"
								value={newTask.date}
								onChange={handleChange}
								required={remindMe}
							/>
						</Col>
						<Col lg={50} md={50} sm={100}>
							<Input
								name="time"
								placeholder="Due Time"
								icon="schedule"
								type="time"
								value={newTask.time}
								onChange={handleChange}
								required={remindMe}
							/>
						</Col>
					</Row>
				)}
				<div
					className="form-group"
					style={{ width: "100%", justifyContent: "flex-start" }}
				>
					<div
						className="add-task-form-group"
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
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
						<div className="add-task-form-remind">
							<input
								type="checkbox"
								checked={remindMe}
								onChange={() => {}}
								id="task-remind-me"
								className="dispn"
							/>
							<label htmlFor="task-remind-me">
								<Switch
									onClick={() => setRemindMe((p) => !p)}
								/>
								<span>Remind Me</span>
							</label>
						</div>
					</div>
				</div>
				<div className="form-group">
					<Button text="Cancel" type="reset" variant="outline" />
					<Button text="Save Task" type="submit" />
				</div>
			</form>
		</Dialog>
	);
};

export default AddTask;
