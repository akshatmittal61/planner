import React, { useEffect, useState } from "react";
import "./home.css";
import people from "../../images/people.svg";
import favicon from "../../images/favicon.svg";

const Home = () => {
	const [imgScale, setImgScale] = useState(1);
	const [showNavigation, setShowNavigation] = useState(false);
	useEffect(() => {
		if (imgScale > 100) {
			setTimeout(() => {
				setShowNavigation(true);
			}, 3000);
		}
	}, [imgScale]);

	return (
		<main className="home">
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
									style={{
										transform: `scale(${imgScale})`,
										transition: "all 2.5s linear",
									}}
									onClick={() => {
										setImgScale(500);
									}}
								/>
							</div>
							{imgScale < 10 && (
								<div className="home-box-title">
									<span className="home-box-title__text">
										Planner
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{showNavigation && (
				<section className="home-navigation">
					Calendar Events Notes Tasks
				</section>
			)}
		</main>
	);
};

export default Home;
