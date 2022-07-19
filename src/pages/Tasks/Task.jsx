import React from "react";
import IconButton from "../../components/Button/IconButton";
import MaterialIcons from "../../components/MaterialIcons";

const Task = ({ title, color, done }) => {
	return (
		<div
			className="tasks-body-task task"
			style={{
				backgroundColor: `var(--${color}-100)`,
			}}
		>
			<div className="task-title">{title}</div>
			<button className="icon task-control task-control-done">
				<MaterialIcons>
					{done ? "done_all" : "check_circle"}
				</MaterialIcons>
			</button>
			<div className="task-controls">
				<IconButton
					icon="edit"
					className="task-control task-control-edit"
					fill="var(--back-shadow-light)"
				/>
				<IconButton
					icon="delete"
					className="task-control task-control-delete"
					fill="var(--back-shadow-light)"
				/>
			</div>
		</div>
	);
};

export default Task;
