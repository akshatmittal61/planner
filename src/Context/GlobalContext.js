import { createContext } from "react";

const GlobalContext = createContext({
	theme: "",
	setTheme: () => {},
	toggleTheme: () => {},
	breakpoint: () => {},
	isLoading: "",
	setIsLoading: () => {},
	isAuthenticated: "",
	setIsAuthenticated: () => {},
	user: undefined,
	setUser: () => {},
	openSideBar: "",
	setOpenSideBar: () => {},
	toggleSideBar: () => {},
	sideBarLinks: [],
	setSideBarLinks: () => {},
	axiosInstance: undefined,
});

export default GlobalContext;
