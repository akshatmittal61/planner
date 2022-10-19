import React, { useContext, useState } from "react";
import Input, { TextArea } from "../Input/Input";
import Button from "../Button/Button";
import emailjs from "emailjs-com";
import "./footer.css";
import { GitHub, Linkedin, Mail } from "react-feather";
import GlobalContext from "../../Context/GlobalContext";
import favicon, { waves } from "../../utils/images";

const Footer = () => {
	const { theme, accentColor, setOpenSnackBar, setSnack } =
		useContext(GlobalContext);
	const [userMessage, setUserMessage] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [imgClicked, setImgClicked] = useState(false);
	const c = (x) => Math.cos((Math.PI * x) / 180);
	const s = (x) => Math.sin((Math.PI * x) / 180);
	const pos = (x) => `translate( ${r * c(x)}rem, ${r * s(x)}rem)`;
	const r = 7;
	const socials = [
		{
			username: "akshatmittal2506@gmail.com",
			link: "mailto:akshatmittal2506@gmail.com",
			icon: <Mail />,
			angle: -90,
		},
		{
			username: "@akshatmittal61",
			link: "https://www.linkedin.com/in/akshatmittal61",
			icon: <Linkedin />,
			angle: -30,
		},
		{
			username: "@akshatmittal61",
			link: "https://www.github.com/akshatmittal61",
			icon: <GitHub />,
			angle: 30,
		},
		{
			username: "snehasharma9205@gmail.com",
			link: "mailto:snehasharma9205@gmail.com",
			icon: <Mail />,
			angle: 90,
		},
		{
			username: "@snehasharma1111",
			link: "https://www.linkedin.com/in/snehasharma1111",
			icon: <Linkedin />,
			angle: 150,
		},
		{
			username: "@snehasharma1111",
			link: "https://www.github.com/snehasharma1111",
			icon: <GitHub />,
			angle: 210,
		},
	];
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserMessage((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		emailjs
			.sendForm(
				process.env.REACT_APP_SERVICE,
				process.env.REACT_APP_TEMPLATE,
				e.target,
				process.env.REACT_APP_USER
			)
			.then((res) => console.info(res))
			.catch((err) => console.error(err));
		setSnack({
			text: "Your message has been sent",
			bgColor: "var(--green)",
			color: "var(--white)",
		});
		setOpenSnackBar(true);
		setTimeout(() => {
			setOpenSnackBar(false);
		}, 5000);
		setUserMessage({
			name: "",
			email: "",
			message: "",
		});
	};
	const handleReset = (e) => {
		e.preventDefault();
		setUserMessage({
			name: "",
			email: "",
			message: "",
		});
	};
	return (
		<footer
			className="footer"
			style={{
				backgroundImage: `url(${
					waves[accentColor][theme === "light" ? 0 : 1]
				})`,
			}}
		>
			<div className="footer-left">
				<div className="footer-left-container">
					<img
						className="footer-left-logo"
						src={favicon}
						alt="Planner favicon"
						style={{
							width: `${r + 2}rem`,
							height: `${r + 2}rem`,
							animation: imgClicked
								? "none"
								: "zoom 1.5s linear infinite",
						}}
						onClick={() => setImgClicked((prev) => !prev)}
					/>
					<div className="footer-left-socials">
						{socials.map((social, index) => (
							<a
								href={social.link}
								key={index}
								className="footer-left-social"
								title={social.username}
								style={{
									transform: imgClicked && pos(social.angle),
								}}
								target="_blank"
								rel="noreferrer"
							>
								{social.icon}
							</a>
						))}
					</div>
				</div>
			</div>
			<div className="footer-right">
				<div className="footer-right-feedback">
					<h2>Contact Us</h2>
					<form
						className="footer-right-form"
						onReset={handleReset}
						onSubmit={handleSubmit}
					>
						<Input
							type="text"
							name="name"
							required
							placeholder="Enter Your Name"
							icon="person"
							value={userMessage.name}
							onChange={handleChange}
						/>
						<Input
							type="email"
							name="email"
							required
							placeholder="Enter Your Email"
							icon="mail"
							value={userMessage.email}
							onChange={handleChange}
						/>
						<TextArea
							type="text"
							name="message"
							required
							placeholder="Your Message Here"
							icon="chat"
							value={userMessage.message}
							onChange={handleChange}
							rows={5}
						/>
						<div className="form-group">
							<Button
								text="Cancel"
								type="reset"
								color={accentColor}
							/>
							<Button
								text="Submit"
								type="submit"
								variant="fill"
								color={accentColor}
							/>
						</div>
					</form>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
