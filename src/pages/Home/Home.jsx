import React, { useState } from "react";
import "./home.css";
import people from "../../images/people.svg";
import favicon from "../../images/favicon.svg";

const Home = () => {
	const [continueAfterClick, setContinueAfterClick] = useState(
		JSON.parse(window.sessionStorage.getItem("logoClicked")) || false
	);
	return (
		<main className="home">
			{!continueAfterClick ? (
				<div className="card">
					<div
						className="card-frame"
						data-aos="fade-in"
						data-aos-duration={2000}
					>
						<div className="card-box">
							<div className="home-box-head" data-aos="zoom-out">
								<div
									className="home-box-image"
									style={{
										backgroundImage: `url(${people})`,
									}}
								>
									<img
										className="home-box-image__img"
										src={favicon}
										alt="favicon"
										onClick={() => {
											setContinueAfterClick(true);
										}}
									/>
								</div>
								<div className="home-box-title">
									<span className="home-box-title__text">
										Planner
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</main>
	);
};

export default Home;
