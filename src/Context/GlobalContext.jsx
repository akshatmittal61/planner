import React, { useState, createContext } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const breakpoint = (device) => {
		if (device === "mobile") return window.innerWidth < 672;
		else if (device === "tab") return window.innerWidth <= 880;
		else return window.innerWidth > 880;
	};
	const isLocalAuthenticated = localStorage.getItem("isAuthenticated");
	const [isAuthenticated, setIsAuthenticated] = useState(
		JSON.parse(isLocalAuthenticated)
	);
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState({
		name: "Akshat Mittal",
		status: "Developing",
		email: "akshatmittal2506@gmail.com",
		phone: 9456849466,
		username: "akshatmittal61",
		bio: "MERN Stack developer",
		dob: "2002-06-25",
		gender: "Male",
		avatar: "https://avatars.githubusercontent.com/u/84612609",
	});
	const axiosInstance = axios.create({
		baseURL: "http://localhost:5000/",
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	});
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
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContext;
