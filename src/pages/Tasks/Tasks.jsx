import React from "react";
import "./tasks.css";

const Tasks = () => {
	return (
		<main className="tasks">
			<section className="tasks-head">
				<span>Tasks</span>
			</section>
			<section className="tasks-body">
				<div className="tasks-body-section">
					<span className="tasks-body-section__head">All Tasks</span>
					<div className="tasks-body-section__body"></div>
				</div>
			</section>
		</main>
	);
};

export default Tasks;

