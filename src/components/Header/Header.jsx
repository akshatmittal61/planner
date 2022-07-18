import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MaterialIcons from "../MaterialIcons";
import "./header.css";
import "../Button/button.css";
import GlobalContext from "../../Context/GlobalContext";
import AppBox from "../AppBox/AppBox";
import userFallBack from "../../images/user.svg";

const Header = () => {
	const { user, openSideBar, setOpenSideBar } = useContext(GlobalContext);
	const vh = window.innerHeight / 100;
	const location = useLocation();
	const navigate = useNavigate();
	const [shadow, setShadow] = useState("none");
	const [height, setHeight] = useState(
		location.pathname === "/" ? 0 : "var(--head-height)"
	);
	const [openAppBox, setOpenAppBox] = useState(false);
	const [userImg, setUserImg] = useState(user.avatar);
	useEffect(() => {
		document.addEventListener("scroll", () => {
			if (window.scrollY > 30 * vh) {
				setShadow("var(--shadow-elevation-4dp)");
				setHeight("var(--head-height)");
			} else {
				setShadow("none");
				setHeight("0");
			}
		});
	}, []);
	useEffect(() => {
		setOpenAppBox(false);
	}, [location.pathname]);

	return (
		<header
			className="header"
			style={{
				boxShadow: shadow,
				borderBottomColor:
					shadow === "none"
						? "var(--back-shadow-light)"
						: "transparent",
				height:
					location.pathname === "/" && !openSideBar
						? height
						: "var(--head-height)",
			}}
		>
			<div className="header-left">
				<div className="header-left-burger">
					<button
						className="header-left-burger__button icon"
						onClick={() => {
							setOpenSideBar(!openSideBar);
						}}
					>
						<MaterialIcons>
							{openSideBar ? "menu_open" : "menu"}
						</MaterialIcons>
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
				<button
					className="icon"
					onClick={() => {
						setOpenAppBox((p) => !p);
					}}
				>
					<MaterialIcons>apps</MaterialIcons>
				</button>
				{openAppBox && <AppBox close={() => setOpenAppBox(false)} />}
				<button
					className="icon"
					onClick={() => {
						navigate("/profile");
					}}
				>
					{user?.avatar ? (
						<img
							className="header-right-avatar"
							src={userImg}
							alt={user.name}
							onError={() => {
								setUserImg(userFallBack);
							}}
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
