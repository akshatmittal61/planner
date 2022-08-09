import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import loginBg from "../../images/login-bg.jpeg";
import a from "../../images/brick.svg";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import GlobalContext from "../../Context/GlobalContext";
import MaterialIcons from "../../components/MaterialIcons";
import Input from "../../components/Input/Input";

const Login = () => {
	const navigate = useNavigate();
	const { setUser, setIsAuthenticated, isAuthenticated } =
		useContext(GlobalContext);
	const [loginUser, setLoginUser] = useState({
		username: "",
		password: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(loginUser);
		setLoginUser({
			username: "",
			password: "",
		});
		setIsAuthenticated(true);
		localStorage.setItem("isAuthenticated", true);
		const loggedInUser = {
			fname: "Akshat",
			lname: "Mittal",
			status: "Developing",
			email: "akshatmittal2506@gmail.com",
			phone: 9456849466,
			username: "akshatmittal61",
			bio: "MERN Stack developer",
			dob: "2002-06-25",
			gender: "Male",
			avatar: "https://avatars.githubusercontent.com/u/84612609",
		};
		localStorage.setItem("user", JSON.stringify(loggedInUser));
		setUser(loggedInUser);
		navigate("/");
	};
	useEffect(() => {
		if (isAuthenticated) navigate("/dashboard");
	}, [isAuthenticated, navigate]);
	return (
		<section
			className="login"
			style={{
				backgroundImage: `url(${a})`,
			}}
		>
			<div className="login-container" data-aos="zoom-in">
				<div className="login-left">
					<div className="legin-left-top">
						<div className="login-left-title">Welcome!</div>
						<form
							className="login-left-form"
							onSubmit={handleSubmit}
						>
							<Input
								icon="person"
								type="text"
								name="username"
								value={loginUser.username}
								onChange={handleChange}
								placeholder="Username"
							/>
							<Input
								icon="lock"
								type="password"
								name="password"
								value={loginUser.password}
								onChange={handleChange}
								placeholder="Password"
							/>
							<div className="login-left-form-group">
								<span></span>
								<Button
									type="submit"
									text="Login"
									color="brown"
								/>
							</div>
						</form>
					</div>
					<div className="login-left-bottom">
						<span>Don't have an account? </span>
						<Link to="/register">Sign Up</Link>
					</div>
				</div>
				<div
					className="login-right"
					style={{
						backgroundImage: `url(${loginBg})`,
					}}
				>
					<button className="icon" onClick={() => navigate("/")}>
						<MaterialIcons>close</MaterialIcons>
					</button>
				</div>
			</div>
		</section>
	);
};

export default Login;
