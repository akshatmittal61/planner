import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header/Header";

const App = () => {
	AOS.init();
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	);
};

export default App;
