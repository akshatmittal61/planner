import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "../Context/GlobalContext";
import Loader from "./Loader/Loader";

const PrivateRoute = ({ children }) => {
	const { isAuthenticated, isLoading } = useContext(GlobalContext);
	if (!isLoading) {
		if (isAuthenticated) return children;
		else return <Navigate to="/login" />;
	}
	return <Loader />;
};

export default PrivateRoute;
