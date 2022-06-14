import React from "react";
import "./home.css";
import people from "../../images/people.svg";
import favicon from "../../images/favicon.svg";

const Home = () => {
	return (
		<main class="home">
			<div class="card">
				<div
					class="card-frame"
					data-aos="fade-in"
					data-aos-duration={2000}
				>
					<div class="card-box">
						<div class="home-box-head" data-aos="zoom-out">
							<div
								class="home-box-image"
								style={{
									backgroundImage: `url(${people})`,
								}}
							>
								<img
									class="home-box-image__img"
									src={favicon}
									alt="favicon"
								/>
							</div>
							<div class="home-box-title">
								<span class="home-box-title__text">
									Planner
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Home;
