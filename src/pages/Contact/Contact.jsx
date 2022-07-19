import React from "react";
import "./contact.css";
import banner from "../../images/contact-us-banner.png";
import people from "./people.json";
import Card from "./Card";

const Contact = () => {
	return (
		<main className="contact" style={{ backgroundImage: `url(${banner})` }}>
			<section className="contact-section">
				{people.map((person, index) => (
					<Card
						key={index}
						name={person.name}
						about={person.about}
						image={person.image}
						socials={person.socials}
					/>
				))}
			</section>
		</main>
	);
};

export default Contact;
