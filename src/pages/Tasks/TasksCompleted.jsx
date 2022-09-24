import React, { useContext, useEffect } from "react";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { tasksNavLinks } from "../../utils/navigation";
import Task from "./Task";
import "./tasks.css";
import Empty from "../../components/Empty/Empty";
import "./tasks.css";
import { nullTasks } from "../../utils/images";

const TasksCompleted = () => {
	const { setSideBarLinks, tasks } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(tasksNavLinks);
	}, [setSideBarLinks]);

	return (
		<main className="tasks">
			{tasks?.length > 0 && tasks.some((p) => p.done) ? (
				<>
					<section className="tasks-head">
						<span>Completed Tasks</span>
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
											task.done &&
											!task.trashed && (
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
				<Empty img={nullTasks} text="No Task Yet" />
			)}
		</main>
	);
};

export default TasksCompleted;
