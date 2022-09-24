import React, { useContext, useState } from "react";
import IconButton from "../../components/Button/IconButton";
import Chip from "../../components/Chip/Chip";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import TaskPopup from "./TaskPopup";
import Popup from "../../Layout/Popup/Popup";
import { min } from "../../utils";

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
	const {
		theme,
		markTaskAsDone,
		markTaskAsNotDone,
		moveTaskToTrash,
		restoreTaskFromTrash,
		deleteTask,
	} = useContext(GlobalContext);
	let chipText = `${title?.slice(0, min(15, title.length))}${
		title.length > 15 ? "..." : ""
	}`;
	const [openTaskPopup, setOpenTaskPopup] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [popupCta, setPopupCta] = useState({
		text: "Move to Trash",
		color: "red",
		icon: "delete",
	});
	const [popupContent, setPopupContent] = useState(
		<>
			Move the note <Chip text={chipText} size="small" color={color} /> to
			Trash Bin?
		</>
	);
	return (
		<div
			className="tasks-body-task task"
			style={{
				backgroundColor: `var(--${color}-${
					theme === "light" ? "100" : "700"
				})`,
			}}
		>
			<div className="task-title">{title}</div>
			<div className="task-description">{description}</div>
			{!trashed && (
				<button
					className="icon task-control task-control-done"
					onClick={() => {
						done
							? markTaskAsNotDone(rest._id)
							: markTaskAsDone(rest._id);
						setOpenTaskPopup(false);
					}}
				>
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
				{trashed ? (
					<>
						<IconButton
							icon="restore"
							className="task-control task-control-edit"
							fill="var(--back-shadow-light)"
							title="Restore Task"
							onClick={() => {
								setPopupCta(() => ({
									text: "Restore Note",
									color: "green",
									icon: "restore",
									onClick: () => {
										restoreTaskFromTrash(rest._id);
										setOpenPopup(false);
									},
								}));
								setPopupContent(() => (
									<>
										Restore task{" "}
										<Chip
											text={chipText}
											size="small"
											color={color}
										/>{" "}
										?
									</>
								));
								setOpenTaskPopup(false);
								setOpenPopup(true);
							}}
						/>
						<IconButton
							icon="delete_forever"
							className="task-control task-control-delete"
							fill="var(--back-shadow-light)"
							title="Delete Forever"
							onClick={() => {
								setPopupCta(() => ({
									text: "Delete forever",
									color: "red",
									icon: "delete",
									onClick: () => {
										deleteTask(rest._id);
										setOpenPopup(false);
									},
								}));
								setPopupContent(() => (
									<>
										Delete task{" "}
										<Chip
											text={chipText}
											size="small"
											color={color}
										/>{" "}
										forever? This actions can't be undone.
									</>
								));
								setOpenTaskPopup(false);
								setOpenPopup(true);
							}}
						/>
					</>
				) : (
					<>
						<IconButton
							icon="edit"
							className="task-control task-control-edit"
							fill="var(--back-shadow-light)"
							title="Edit Task"
							onClick={() => setOpenTaskPopup(true)}
						/>
						<IconButton
							icon="delete"
							className="task-control task-control-delete"
							fill="var(--back-shadow-light)"
							title="Move To Trash"
							onClick={() => {
								setPopupCta(() => ({
									text: "Move to Trash",
									color: "red",
									icon: "delete",
									onClick: () => {
										moveTaskToTrash(rest._id);
										setOpenPopup(false);
									},
								}));
								setPopupContent(() => (
									<>
										Move the task{" "}
										<Chip
											text={chipText}
											size="small"
											color={color}
										/>{" "}
										to Trash Bin?
									</>
								));
								setOpenTaskPopup(false);
								setOpenPopup(true);
							}}
						/>
					</>
				)}
			</div>
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
			{openPopup && (
				<Popup
					width="50%"
					height="fit-content"
					breakpoints={{
						tab: ["60%", "fit-content"],
						mobile: ["90%", "fit-content"],
					}}
					cta={popupCta}
					close={() => setOpenPopup(false)}
				>
					<span style={{ fontSize: "1.25rem", lineHeight: "1.5rem" }}>
						{popupContent}
					</span>
				</Popup>
			)}
		</div>
	);
};

export default Task;
