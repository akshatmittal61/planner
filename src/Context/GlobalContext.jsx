import React, { useState, createContext } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const mediaQuerySm = window.matchMedia("(max-width: 672px)");
	const mediaQueryMd = window.matchMedia("(max-width: 880px)");
	const mediaQueryLg = window.matchMedia("(min-width: 880px)");
	const breakpoint = (device) => {
		if (device === "mobile") return mediaQuerySm.matches;
		else if (device === "tab") return mediaQueryMd.matches;
		else return mediaQueryLg.matches;
	};
	mediaQuerySm.addListener(breakpoint);
	mediaQueryMd.addListener(breakpoint);
	mediaQueryLg.addListener(breakpoint);
	const isLocalAuthenticated = localStorage.getItem("isAuthenticated");
	const [isAuthenticated, setIsAuthenticated] = useState(
		JSON.parse(isLocalAuthenticated) || false
	);
	const [isLoading, setIsLoading] = useState(false);
	const [openSideBar, setOpenSideBar] = useState(false);
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const axiosInstance = axios.create({
		baseURL: "http://localhost:5000/",
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	});
	const [sideBarLinks, setSideBarLinks] = useState([
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
	]);
	return (
		<GlobalContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				isLoading,
				setIsLoading,
				axiosInstance,
				user,
				setUser,
				breakpoint,
				openSideBar,
				setOpenSideBar,
				sideBarLinks,
				setSideBarLinks,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContext;
