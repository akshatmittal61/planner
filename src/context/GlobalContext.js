import { createContext } from "react";

export const GlobalContext = createContext({
	theme: "",
	setTheme: () => {},
	handleTheme: () => {},
	breakpoint: () => {},
	isLoading: false,
	setIsLoading: () => {},
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	user: undefined,
	setUser: () => {},
	openSideBar: false,
	setOpenSideBar: () => {},
	sideBarLinks: [],
	setSideBarLinks: () => {},
	axiosInstance: undefined,
});
