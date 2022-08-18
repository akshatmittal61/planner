import React, { useContext, useEffect } from "react";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { tasksNavLinks } from "../../utils/navigation";
import Task from "./Task";
import "./tasks.css";

const TasksTrash = () => {
	const { setSideBarLinks, tasks, getAllTasks } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(tasksNavLinks);
		window.scrollTo(0, 0);
		getAllTasks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setSideBarLinks]);

	return (
		<main className="tasks">
			{tasks?.length > 0 && (
				<>
					<section className="tasks-head">
						<span>Trash Bin</span>
					</section>
					<section className="tasks-body">
						<div className="tasks-body-section">
							<span className="tasks-body-section__head">
								My Tasks
							</span>
							<div className="tasks-body-section__body">
								<Masonry lg={4} md={3} sm={2}>
									{tasks.map(
										(task, index) =>
											task.trashed && (
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
			)}
		</main>
	);
};

export default TasksTrash;
