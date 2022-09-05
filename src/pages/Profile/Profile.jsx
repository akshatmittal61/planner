import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import Row, { Col } from "../../Layout/Responsive";
import "./profile.css";
import Button from "../../components/Button/Button";
import { userFallBackImg } from "../../utils/images";

const Profile = () => {
	const navigate = useNavigate();
	const {
		user,
		setIsLoading,
		axiosInstance,
		updateUser,
		setSnack,
		setOpenSnackBar,
	} = useContext(GlobalContext);
	const [profileUser, setProfileUser] = useState({
		...user,
	});
	const [edit, setEdit] = useState(false);
	const [userImage, setUserImage] = useState(user?.avatar);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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
		let editedUser = { username: user.username };
		for (let i in profileUser)
			if (profileUser[i] !== user[i])
				editedUser = { ...editedUser, [i]: profileUser[i] };
		try {
			setIsLoading(true);
			const res = await axiosInstance.put("/api/auth/edit", {
				...editedUser,
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
				updateUser({ ...res.data.user });
				setProfileUser({ ...profileUser, ...res.data.user });
				setUserImage(res.data.user?.avatar);
			} else {
				setSnack({
					text: res.data.message,
					bgColor: "var(--yellow)",
					color: "var(--white)",
				});
				setOpenSnackBar(true);
				setTimeout(() => {
					setOpenSnackBar(false);
				}, 5000);
			}
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response.data.message,
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
								<img
									src={userImage}
									alt={user?.name}
									onError={() =>
										setUserImage(userFallBackImg)
									}
								/>
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
						{/*edit && (
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
						)*/}
					</Row>
					<Button className="dispn" type="submit" />
				</form>
			</section>
		</main>
	);
};

export default Profile;
