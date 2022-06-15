import React, { useEffect, useState } from "react";
import "./home.css";
import people from "../../images/people.svg";
import favicon from "../../images/favicon.svg";
import MaterialIcons from "../../components/MaterialIcons";
import LinkButton from "../../components/LinkButton/LinkButton";
import routes from "../../routes";

const Home = () => {
	const [scrolled, setScrolled] = useState(false);
	const vh = window.innerHeight / 100;
	useEffect(() => {
		window.scrollTo(0, 0);
		document.addEventListener("scroll", () => {
			if (window.scrollY > 25 * vh) setScrolled(true);
			else setScrolled(false);
		});
	}, []);

	return (
		<main className="home">
			<div className="card">
				<div
					className="card-frame"
					style={{
						padding: scrolled ? "0" : "0.5rem 0.25rem",
					}}
					data-aos="fade-in"
					data-aos-duration={2000}
				>
					<div
						className="card-box"
						style={{
							width: !scrolled ? "99%" : "100%",
							height: !scrolled ? "99%" : "100%",
						}}
					>
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
			<div className="home-navigation">
				<div className="row">
					{routes.map((route, index) => (
						<div className="col-lg-100 col-md-100 col-sm-100">
							<div
								className="home-navigation-card"
								style={{
									flexFlow: index % 2 ? "row-reverse" : "row",
									backgroundColor: route.color,
								}}
							>
								<div
									className="home-navigation-card-image"
									style={{
										backgroundImage: `url(${route.poster})`,
									}}
								></div>
								<div className="home-navigation-card-content">
									<span className="home-navigation-card-content__title">
										{route.title}
									</span>
									<span className="home-navigation-card-content__about">
										{route.about}
									</span>
									<LinkButton to={route.route}>
										<span>{route.navTitle}</span>
										<MaterialIcons>
											north_east
										</MaterialIcons>
									</LinkButton>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default Home;
