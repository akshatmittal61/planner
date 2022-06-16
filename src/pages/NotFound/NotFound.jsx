import React, { useEffect } from "react";
import Button from "../../components/Button/Button";
import tourist from "../../images/tourist.png";
import blueSky from "../../images/blue-sky.png";
import "./not-found.css";

const NotFound = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main
			className="not-found"
			style={{ backgroundImage: `url(${blueSky})` }}
		>
			<div className="not-found-image">
				<img src={tourist} alt="Tourist 404" />
			</div>
			<div className="not-found-content">
				<h1 className="not-found-content__h1">Oops! Error 404</h1>
				<p className="not-found-content__p">
					Couldn't find the page you were looking for...
				</p>
				<div className="not-found-content__buttons">
					<Button
						text="Back to Home"
						color="indigo"
						link="/"
						variant="fill"
						icon="home"
					/>
					<Button
						text="Send Us a feedback"
						color="indigo"
						link="/feedbck"
						variant="outline"
						icon="chat"
					/>
				</div>
			</div>
		</main>
	);
};

export default NotFound;
