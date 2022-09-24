import React from "react";
import favicon from "../../utils/images";
import "./about.css";

const About = () => {
	return (
		<main className="about">
			<section className="about-head">
				<div className="about-head-image">
					<img src={favicon} alt="Planner" />
				</div>
				<div className="about-head-content">
					<span className="about-head-content__title">Planner</span>
					<span className="about-head-content__p">
						Get more done with Planner. Manage, capture and edit
						your daily events, notes and tasks.
					</span>
				</div>
			</section>
			<section className="about-body">
				<span>
					Planner is a web application to help the user to help them
					record their everyday events, activities and tasks.
				</span>
			</section>
			<section className="about-body">
				<span>
					Organize your Calendar, events, notes and tasks with
					Planner.
				</span>
				<span>
					Add an event to remind you on a birthday, anniversary or
					your traditional festival etc.
				</span>
				<span>
					Quickly capture what's on your mind and write it down in
					Notes for seeing it anytime.
				</span>
				<span>
					Share your thoughts easily with your family, friends and
					colleagues.
				</span>
				<span>Capture and write in tasks to remind you later on.</span>
			</section>
		</main>
	);
};

export default About;
