import React, { useContext, useState } from "react";
import IconButton from "../../components/Button/IconButton";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import TaskPopup from "./TaskPopup";

const Task = ({
	title,
	description,
	color,
	date,
	time,
	done,
	trashed,
	...rest
}) => {
	const { theme } = useContext(GlobalContext);
	const [openTaskPopup, setOpenTaskPopup] = useState(false);
	return (
		<div
			className="tasks-body-task task"
			style={{
				backgroundColor: `var(--${color}-${
					theme === "light" ? "100" : "700"
				})`,
			}}
			onClick={() => setOpenTaskPopup(true)}
		>
			<div className="task-title">{title}</div>
			<div className="task-description">{description}</div>
			{!trashed && (
				<button className="icon task-control task-control-done">
					<MaterialIcons
						title={done ? "Mark as not done" : "Mark as done"}
					>
						{done ? "done_all" : "check_circle"}
					</MaterialIcons>
				</button>
			)}
			<div
				className="task-controls"
				style={{
					backgroundColor: `var(--${color}-${
						theme === "light" ? "100" : "700"
					})`,
				}}
			>
				{!trashed && (
					<IconButton
						icon="edit"
						className="task-control task-control-edit"
						fill="var(--back-shadow-light)"
						title="Edit Task"
					/>
				)}
				{trashed && (
					<IconButton
						icon="restore"
						className="task-control task-control-edit"
						fill="var(--back-shadow-light)"
						title="Restore Task"
					/>
				)}
				<IconButton
					icon={trashed ? "delete_forever" : "delete"}
					className="task-control task-control-delete"
					fill="var(--back-shadow-light)"
					title={trashed ? "Delete Forever" : "Move To Trash"}
				/>
				{openTaskPopup && (
					<TaskPopup
						title={title}
						description={description}
						color={color}
						date={date}
						time={time}
						done={done}
						close={() => setOpenTaskPopup(false)}
						{...rest}
					/>
				)}
			</div>
		</div>
	);
};

export default Task;
