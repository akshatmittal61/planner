import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../Context/GlobalContext";
import MaterialIcons from "../MaterialIcons";
import "./side-bar.css";

const SideBar = () => {
	const { setOpenSideBar } = useContext(GlobalContext);
	const navItems = [
		{
			title: "Home",
			route: "/",
			icon: "home",
		},
		{
			title: "About",
			route: "/about",
			icon: "info",
		},
		{
			title: "Help",
			route: "/help",
			icon: "help",
		},
		{
			title: "Report A Bug",
			route: "/report",
			icon: "report",
		},
		{
			title: "Contact Us",
			route: "/contact",
			icon: "call",
		},
	];
	return (
		<section className="side">
			<div
				className="side-cover"
				onClick={() => setOpenSideBar(false)}
			></div>
			<aside className="side-bar" data-aos="fade-right">
				<nav className="side-nav">
					<ul className="side-nav-ul">
						{navItems.map((item, index) => (
							<li className="side-nav-li" key={index}>
								<Link to={item.route} className="side-nav-link">
									<MaterialIcons>{item.icon}</MaterialIcons>
									<span>{item.title}</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</aside>
		</section>
	);
};

export default SideBar;
