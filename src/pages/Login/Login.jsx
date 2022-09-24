import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import GlobalContext from "../../Context/GlobalContext";
import MaterialIcons from "../../components/MaterialIcons";
import Input from "../../components/Input/Input";
import { bricks, loginBg } from "../../utils/images";

const Login = () => {
	const navigate = useNavigate();
	const {
		isAuthenticated,
		setIsAuthenticated,
		updateUser,
		axiosInstance,
		setIsLoading,
		setSnack,
		setOpenSnackBar,
		synchronize,
		setToken,
	} = useContext(GlobalContext);
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
	const handleSubmit = async (e) => {
		e?.preventDefault();
		try {
			setIsLoading(true);
			const res = await axiosInstance.post("/api/auth/login", {
				...loginUser,
			});
			if (res.status === 200) {
				setSnack({
					text: res.data.message,
					bgColor: "var(--green)",
					color: "var(--white)",
				});
				setOpenSnackBar(true);
				setTimeout(() => {
					setOpenSnackBar(false);
				}, 5000);
				setToken(() => res.data.token);
				setIsAuthenticated(true);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("isAuthenticated", true);
				synchronize();
				updateUser({ ...res.data.user });
				setIsLoading(false);
			}
		} catch (error) {
			setSnack({
				text: error?.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		if (isAuthenticated) navigate(-1);
	}, [isAuthenticated, navigate]);
	return (
		<section
			className="login"
			style={{
				backgroundImage: `url(${bricks})`,
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
