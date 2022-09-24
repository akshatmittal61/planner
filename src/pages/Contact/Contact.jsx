import React from "react";
import "./contact.css";
import people from "./people.json";
import Card from "./Card";
import { contactUsBanner } from "../../utils/images";

const Contact = () => {
	return (
		<main
			className="contact"
			style={{ backgroundImage: `url(${contactUsBanner})` }}
		>
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
