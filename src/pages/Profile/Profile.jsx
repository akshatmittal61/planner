import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import MaterialIcons from "../../components/MaterialIcons";
import SnackBar from "../../components/SnackBar/SnackBar";
import GlobalContext from "../../Context/GlobalContext";
import Row, { Col } from "../../Layout/Responsive";
import "./profile.css";

const Profile = () => {
	const navigate = useNavigate();
	const { user, setUser, setIsLoading, axiosInstance } =
		useContext(GlobalContext);
	const [profileUser, setProfileUser] = useState({
		...user,
	});
	const [edit, setEdit] = useState(false);
	const [open, setOpen] = useState(false);
	const [snack, setSnack] = useState({
		text: "Login Successful",
		bgColor: "var(--green)",
		color: "var(--white)",
	});

	const handleChange = (e) => {
		const { name, value } = e?.target;
		if (name === "name") {
			let arr = value.split(" ");
			let f = arr[0];
			arr.shift();
			let l = arr.join(" ");
			setProfileUser((p) => ({
				...p,
				fname: f,
				lname: l,
			}));
		} else setProfileUser((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = async (e) => {
		e?.preventDefault();
		let editedUser = {};
		for (let i in profileUser)
			if (profileUser[i] !== user[i])
				editedUser = { ...editedUser, [i]: profileUser[i] };
		try {
			setIsLoading(true);
			const res = await axiosInstance.put("/api/auth/edit", {
				...editedUser,
			});
			console.log(res);
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
				// setUser((p) => ({ ...p, ...res.data.user }));
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
	return (
		<main className="profile">
			<section className="profile-container" data-aos="zoom-in">
				<div className="profile-head">
					<div className="profile-head-title">My Profile</div>
					<div className="profile-head-buttons">
						<button
							className="icon profile-edit"
							onClick={() => {
								if (edit) handleSubmit();
								setEdit((p) => !p);
							}}
						>
							<MaterialIcons>
								{edit ? "save" : "edit"}
							</MaterialIcons>
						</button>
						<button
							className="icon profile-close"
							onClick={() => {
								if (edit) setEdit((p) => !p);
								else navigate(-1);
							}}
						>
							<MaterialIcons>close</MaterialIcons>
						</button>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<Row>
						<Col lg={50} md={50} sm={100}>
							<div className="profile-image">
								<img src={user?.avatar} alt={user?.name} />
							</div>
						</Col>
						<Col lg={50} md={50} sm={100}>
							<div className="profile-top">
								<div className="profile-top-name">
									<Input
										type="text"
										name="name"
										disabled={!edit}
										value={
											profileUser?.fname +
											" " +
											profileUser?.lname
										}
										onChange={handleChange}
										placeholder="Your Name"
										title="Your Name"
									/>
								</div>
								<div className="profile-top-username">
									<Input
										type="text"
										name="username"
										icon="account_circle"
										disabled
										value={profileUser?.username}
										onChange={handleChange}
										placeholder="Username"
										title="Username is not editable"
									/>
								</div>
								<div className="profile-top-bio">
									<Input
										type="text"
										name="bio"
										icon="tips_and_updates"
										disabled={!edit}
										value={profileUser?.bio}
										onChange={handleChange}
										placeholder="Short Bio"
									/>
								</div>
							</div>
						</Col>
						<Col lg={50} md={50} sm={100}>
							<Input
								type="email"
								name="email"
								icon="mail"
								disabled={!edit}
								value={profileUser?.email}
								onChange={handleChange}
								placeholder="Email Address"
							/>
						</Col>
						<Col lg={50} md={50} sm={100}>
							<Input
								type="tel"
								name="phone"
								icon="call"
								disabled={!edit}
								value={profileUser?.phone}
								onChange={handleChange}
								placeholder="Phone No."
							/>
						</Col>
						<Col lg={50} md={50} sm={100}>
							<Input
								type="url"
								name="avatar"
								icon="image"
								disabled={!edit}
								value={profileUser?.avatar}
								onChange={handleChange}
								placeholder="Avatar"
							/>
						</Col>
						{edit && (
							<Col lg={50} md={50} sm={100}>
								<Input
									type="password"
									name="password"
									icon="lock"
									disabled={!edit}
									value={profileUser?.password}
									onChange={handleChange}
									placeholder="Password"
								/>
							</Col>
						)}
					</Row>
				</form>
			</section>
			{open && (
				<SnackBar
					text={snack.text}
					bgColor={snack.bgColor}
					color={snack.color}
					close={() => setOpen(false)}
				/>
			)}
		</main>
	);
};

export default Profile;
