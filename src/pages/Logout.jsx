import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "../Context/GlobalContext";

const Logout = () => {
	const { setIsAuthenticated, setUser, setSnack, setOpenSnackBar } =
		useContext(GlobalContext);
	useEffect(() => {
		setIsAuthenticated(false);
		setUser(null);
		localStorage.setItem("isAuthenticated", false);
		localStorage.setItem("user", null);
		localStorage.setItem("token", null);
		setSnack({
			text: "You have been logged out",
			bgColor: "var(--yellow)",
			color: "var(--black)",
		});
		setOpenSnackBar(true);
		setTimeout(() => {
			setOpenSnackBar(false);
		}, 5000);
	}, [setIsAuthenticated, setOpenSnackBar, setSnack, setUser]);

	return <Navigate to={"/"} />;
};

export default Logout;
