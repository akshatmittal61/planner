import React from "react";
import "./contact.css";
import banner from "../../images/contact-us-banner.png";
import Card from "./Card";

const Contact = () => {
	return (
		<main className="contact" style={{ backgroundImage: `url(${banner})` }}>
			<section className="contact-section">
				<Card />
			</section>
		</main>
	);
};

export default Contact;
