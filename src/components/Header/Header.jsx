import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MaterialIcons from "../MaterialIcons";
import "./header.css";
import "../Button/button.css";
import GlobalContext from "../../Context/GlobalContext";

const Header = () => {
	const { user } = useContext(GlobalContext);
	const vh = window.innerHeight / 100;
	const location = useLocation();
	const [shadow, setShadow] = useState("none");
	const [height, setHeight] = useState(
		location.pathname === "/" ? 0 : "4.5rem"
	);
	useEffect(() => {
		document.addEventListener("scroll", () => {
			if (window.scrollY > 30 * vh) {
				setShadow("var(--shadow-elevation-4dp)");
				setHeight("4.5rem");
			} else {
				setShadow("none");
				setHeight("0");
			}
		});
	}, []);
	return (
		<header
			className="header"
			style={{
				boxShadow: shadow,
				borderBottomColor:
					shadow === "none"
						? "var(--back-shadow-light)"
						: "transparent",
				height: location.pathname === "/" ? height : "4.5rem",
			}}
		>
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
