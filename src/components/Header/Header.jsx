import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MaterialIcons from "../MaterialIcons";
import "./header.css";
import "../Button/button.css";
import GlobalContext from "../../Context/GlobalContext";

const Header = () => {
	const { user } = useContext(GlobalContext);
	const vh = window.innerHeight / 100;
	const [shadow, setShadow] = useState("none");
	useEffect(() => {
		document.addEventListener("scroll", () => {
			if (window.scrollY > 30 * vh)
				setShadow("var(--shadow-elevation-4dp)");
			else setShadow("none");
		});
	}, []);

	return (
		<header className="header" style={{ boxShadow: shadow }}>
			<div className="header-left">
				<div className="header-left-burger">
					<button className="header-left-burger__button icon">
						<MaterialIcons>menu</MaterialIcons>
					</button>
				</div>
				<Link to="/" className="header-left-logo">
					Planner
				</Link>
			</div>
			<div className="header-right">
				<button className="icon">
					<MaterialIcons>sync</MaterialIcons>
				</button>
				<button className="icon">
					<MaterialIcons>settings</MaterialIcons>
				</button>
				<button className="icon">
					{user?.avatar ? (
						<img
							className="header-right-avatar"
							src={user.avatar}
							alt={user.name}
						/>
					) : (
						<MaterialIcons>account_circle</MaterialIcons>
					)}
				</button>
			</div>
		</header>
	);
};

export default Header;
