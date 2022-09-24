import React, { useContext, useEffect } from "react";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { tasksNavLinks } from "../../utils/navigation";
import Task from "./Task";
import "./tasks.css";
import Empty from "../../components/Empty/Empty";
import { nullTrash } from "../../utils/images";

const TasksTrash = () => {
	const { setSideBarLinks, tasks } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(tasksNavLinks);
	}, [setSideBarLinks]);

	return (
		<main className="tasks">
			{tasks?.length > 0 && tasks?.some((p) => p.trashed) ? (
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
			) : (
				<Empty
					img={nullTrash}
					text={
						<>
							<h3
								style={{
									fontSize: "3rem",
									lineHeight: "4rem",
									margin: "0 0 1rem 0",
								}}
							>
								Bin is Empty
							</h3>
							<span
								style={{
									fontSize: "2rem",
									lineHeight: "3rem",
								}}
							>
								Items in bin will be deleted forever after 30
								days
							</span>
						</>
					}
				/>
			)}
		</main>
	);
};

export default TasksTrash;
