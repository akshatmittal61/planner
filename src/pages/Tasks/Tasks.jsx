import React, { useContext, useEffect, useState } from "react";
import Fab from "../../components/Button/Fab";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { tasksNavLinks } from "../../utils/navigation";
import { allTasks } from "../../resources";
import AddTask from "./AddTask";
import Task from "./Task";
import "./tasks.css";

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [showAddTaskBox, setShowAddTaskBox] = useState(false);
	const { setSideBarLinks } = useContext(GlobalContext);
	useEffect(() => {
		setTasks(allTasks);
		setSideBarLinks(tasksNavLinks);
		window.scrollTo(0, 0);
	}, [setSideBarLinks]);

	return (
		<main className="tasks">
			<section className="tasks-head">
				<span>Tasks</span>
			</section>
			<section className="tasks-body">
				<div className="tasks-body-section">
					<span className="tasks-body-section__head">My Tasks</span>
					<div className="tasks-body-section__body">
						<Masonry lg={4} md={3} sm={2}>
							{tasks.map(
								(task, index) =>
									!task.done &&
									!task.trashed && (
										<MasonryBox key={index}>
											<Task
												title={task.title}
												description={task.description}
												color={task.color}
												date={task.date}
												time={task.time}
												done={task.done}
												trashed={task.trashed}
											/>
										</MasonryBox>
									)
							)}
						</Masonry>
					</div>
				</div>
			</section>
			<Fab icon="add_task" onClick={() => setShowAddTaskBox(true)} />
			{showAddTaskBox && (
				<AddTask close={() => setShowAddTaskBox(false)} />
			)}
		</main>
	);
};

export default Tasks;
