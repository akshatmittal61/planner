import React from "react";
import { GitHub, Linkedin, Mail, Phone, Twitter } from "react-feather";

const Card = ({ name, about, image, socials }) => {
	const getIcon = (a) => {
		switch (a) {
			case "github":
				return <GitHub />;
			case "linkedin":
				return <Linkedin />;
			case "mail":
				return <Mail />;
			case "twitter":
				return <Twitter />;
			case "phone":
				return <Phone />;
			default:
				break;
		}
	};
	return (
		<div className="contact-card">
			<div className="contact-card-content">
				<div className="contact-card-content__name">{name}</div>
				<div className="contact-card-content__about">{about}</div>
				<div className="contact-card-content__socials">
					{socials?.map((social, index) => (
						<a
							key={index}
							href={social.link}
							target="_blank"
							title={social.username}
							className="icon"
							rel="noreferrer"
						>
							{getIcon(social.service)}
						</a>
					))}
				</div>
			</div>
			<div
				style={{ backgroundImage: `url(${image})` }}
				className="contact-card-image"
			></div>
		</div>
	);
};

export default Card;
