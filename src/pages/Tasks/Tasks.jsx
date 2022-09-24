import React, { useContext, useEffect, useState } from "react";
import Fab from "../../components/Button/Fab";
import Empty from "../../components/Empty/Empty";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { nullTasks } from "../../utils/images";
import { tasksNavLinks } from "../../utils/navigation";
import AddTask from "./AddTask";
import Task from "./Task";
import "./tasks.css";

const Tasks = () => {
	const [showAddTaskBox, setShowAddTaskBox] = useState(false);
	const { setSideBarLinks, tasks } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(tasksNavLinks);
	}, [setSideBarLinks]);

	return (
		<main className="tasks">
			{tasks?.length > 0 && tasks.some((p) => !p.done && !p.trashed) ? (
				<>
					<section className="tasks-head">
						<span>Tasks</span>
					</section>
					<section className="tasks-body">
						<div className="tasks-body-section">
							<span className="tasks-body-section__head">
								My Tasks
							</span>
							<div className="tasks-body-section__body">
								<Masonry lg={4} md={3} sm={2}>
									{tasks?.map(
										(task, index) =>
											!task?.done &&
											!task?.trashed && (
												<MasonryBox key={index}>
													<Task {...task} />
												</MasonryBox>
											)
									)}
								</Masonry>
							</div>
						</div>
					</section>
				</>
			) : (
				<Empty
					img={nullTasks}
					text="No Task Yet"
					cta={{
						text: "Add a task",
						icon: "add",
						action: () => setShowAddTaskBox(true),
					}}
				/>
			)}
			<Fab icon="add_task" onClick={() => setShowAddTaskBox(true)} />
			{showAddTaskBox && (
				<AddTask close={() => setShowAddTaskBox(false)} />
			)}
		</main>
	);
};

export default Tasks;
