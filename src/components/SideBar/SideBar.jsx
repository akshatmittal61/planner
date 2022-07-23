import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../Context/GlobalContext";
import MaterialIcons from "../MaterialIcons";
import "./side-bar.css";

const SideBar = () => {
	const { setOpenSideBar, sideBarLinks } = useContext(GlobalContext);
	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") setOpenSideBar(false);
		});
		return () => {
			document.removeEventListener("keydown", (e) => {
				if (e.key === "Escape") setOpenSideBar(false);
			});
		};
	}, [setOpenSideBar]);

	return (
		<section className="side">
			<div
				className="side-cover"
				onClick={() => setOpenSideBar(false)}
			></div>
			<aside className="side-bar" data-aos="fade-right">
				<nav className="side-nav">
					<ul className="side-nav-ul">
						{sideBarLinks.map((item, index) => (
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
