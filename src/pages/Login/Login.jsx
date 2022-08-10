import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import loginBg from "../../images/login-bg.jpeg";
import a from "../../images/brick.svg";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import GlobalContext from "../../Context/GlobalContext";
import MaterialIcons from "../../components/MaterialIcons";
import Input from "../../components/Input/Input";
import SnackBar from "../../components/SnackBar/SnackBar";

const Login = () => {
	const navigate = useNavigate();
	const {
		isAuthenticated,
		setIsAuthenticated,
		setUser,
		axiosInstance,
		setIsLoading,
	} = useContext(GlobalContext);
	const [loginUser, setLoginUser] = useState({
		username: "",
		password: "",
	});
	const [open, setOpen] = useState(false);
	const [snack, setSnack] = useState({
		text: "Login Successful",
		bgColor: "var(--green)",
		color: "var(--white)",
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
				setOpen(true);
				setTimeout(() => {
					setOpen(false);
				}, 5000);
				setTimeout(() => {
					setIsAuthenticated(true);
				}, 2500);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("user", JSON.stringify(res.data.user));
				localStorage.setItem("isAuthenticated", true);
				setUser({ ...res.data.user });
				setIsLoading(false);
			}
		} catch (error) {
			setSnack({
				text: error.response.data.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpen(true);
			setTimeout(() => {
				setOpen(false);
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
			{open && (
				<SnackBar
					text={snack.text}
					bgColor={snack.bgColor}
					color={snack.color}
					close={() => setOpen(false)}
				/>
			)}
		</section>
	);
};

export default Login;
