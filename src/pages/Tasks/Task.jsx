import React from "react";
import IconButton from "../../components/Button/IconButton";
import MaterialIcons from "../../components/MaterialIcons";

const Task = ({ title, description, color, done, trashed }) => {
	return (
		<div
			className="tasks-body-task task"
			style={{
				backgroundColor: `var(--${color}-100)`,
			}}
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
				style={{ backgroundColor: `var(--${color}-100)` }}
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
			</div>
		</div>
	);
};

export default Task;
