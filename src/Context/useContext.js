import axios from "axios";
import { useEffect, useState } from "react";
import defaultNavLinks from "../utils/navigation";

export const useContextData = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [openSideBar, setOpenSideBar] = useState(false);
	const [sideBarLinks, setSideBarLinks] = useState(defaultNavLinks);

	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light"
	);
	const handleTheme = () => {
		document.body.classList = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", theme === "light" ? "dark" : "light");
		setTheme((p) => (p === "light" ? "dark" : "light"));
	};

	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const isLocalAuthenticated = localStorage.getItem("isAuthenticated");
	const [isAuthenticated, setIsAuthenticated] = useState(
		JSON.parse(isLocalAuthenticated) || false
	);
	const axiosInstance = axios.create({
		baseURL: "http://localhost:5000/",
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	});

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

	useEffect(() => {
		handleTheme();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		theme,
		setTheme,
		handleTheme,
		breakpoint,
		isLoading,
		setIsLoading,
		isAuthenticated,
		setIsAuthenticated,
		user,
		setUser,
		openSideBar,
		setOpenSideBar,
		sideBarLinks,
		setSideBarLinks,
		axiosInstance,
	};
};
