import React, { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import IconButton from "../../components/Button/IconButton";
import Input, { TextArea } from "../../components/Input/Input";
import GlobalContext from "../../Context/GlobalContext";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";
import { colors } from "../../utils";

const TaskPopup = ({
	close,
	title,
	description,
	color,
	date,
	time,
	done,
	...rest
}) => {
	let originalTask = { title, description, color, date, time, done };
	const { user, updateOneTask } = useContext(GlobalContext);
	const [currTask, setCurrTask] = useState({
		title,
		description,
		color,
		date,
		time,
		done,
	});
	const [openColorBox, setOpenColorBox] = useState(false);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCurrTask((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = (e) => {
		e?.preventDefault();
		let editedTask = { username: user.username };
		for (let i in currTask) {
			if (currTask[i] !== originalTask[i])
				editedTask = { ...editedTask, [i]: currTask[i] };
		}
		updateOneTask(rest._id, editedTask);
	};
	const handleReset = (e) => {
		e?.preventDefault();
		setCurrTask({ title, description, color, date, time, done });
	};
	return (
		<Dialog
			close={close}
			color={currTask.color}
			cta={{
				text: "Save task",
				icon: "save",
				action: () => handleSubmit(),
			}}
			bodyStyle={{ backgroundColor: `var(--${currTask.color}-100)` }}
		>
			<form
				className="add-task-form"
				onSubmit={handleSubmit}
				onReset={handleReset}
			>
				<Input
					name="title"
					placeholder="Task Title"
					icon="edit"
					type="text"
					value={currTask.title}
					onChange={handleChange}
				/>
				<TextArea
					name="description"
					placeholder="Task Description"
					icon="notes"
					type="text"
					value={currTask.description}
					onChange={handleChange}
				/>
				<Row>
					<Col lg={50} md={50} sm={100}>
						<Input
							name="date"
							placeholder="Due Date"
							icon="calendar_month"
							type="date"
							value={currTask.date}
							onChange={handleChange}
						/>
					</Col>
					<Col lg={50} md={50} sm={100}>
						<Input
							name="time"
							placeholder="Due Time"
							icon="schedule"
							type="time"
							value={currTask.time}
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
							fill={`var(--${currTask.color}-400)`}
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
														setCurrTask((p) => ({
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
				<div className="form-group">
					<Button text="Cancel" type="reset" variant="outline" />
					<Button text="Save Changes" type="submit" />
				</div>
			</form>
		</Dialog>
	);
};

export default TaskPopup;
