import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { tasksNavLinks } from "../../navigation";
import { allTasks } from "../../resources";
import Task from "./Task";
import "./tasks.css";

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const { setSideBarLinks } = useContext(GlobalContext);
	useEffect(() => {
		setTasks(allTasks);
		setSideBarLinks(tasksNavLinks);
		window.scrollTo(0, 0);
	}, []);

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
							{tasks.map((task, index) => (
								<MasonryBox key={index}>
									<Task
										title={task.title}
										description={task.description}
										color={task.color}
										done={task.done}
									/>
								</MasonryBox>
							))}
						</Masonry>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Tasks;
