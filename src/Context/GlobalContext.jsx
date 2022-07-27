import React, { useState, createContext } from "react";
import axios from "axios";
import defaultNavLinks from "../navigation";

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
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light"
	);
	const axiosInstance = axios.create({
		baseURL: "http://localhost:5000/",
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	});
	const [sideBarLinks, setSideBarLinks] = useState(defaultNavLinks);
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
				theme,
				setTheme,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContext;
