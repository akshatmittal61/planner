import React, { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import IconButton from "../../components/Button/IconButton";
import Input, { TextArea } from "../../components/Input/Input";
import GlobalContext from "../../Context/GlobalContext";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";
import { colors, imageBackgroundUrl } from "../../utils";
import { slash } from "../../utils/images";

const EditList = ({
	close,
	title,
	description,
	color,
	poster,
	_id,
	...rest
}) => {
	const { user, editList } = useContext(GlobalContext);
	const originalList = { title, description, color, poster };
	const [currList, setCurrList] = useState({
		title,
		description,
		color,
		poster,
	});
	const notesBackgrounds = Array(24).fill(null);
	const [openColorBox, setOpenColorBox] = useState(false);
	const [openImageBox, setOpenImageBox] = useState(false);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCurrList((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = (e) => {
		e?.preventDefault();
		let editedList = { username: user.username };
		for (let i in currList) {
			if (currList[i] !== originalList[i])
				editedList = { ...editedList, [i]: currList[i] };
		}
		editList(_id, editedList);
	};
	return (
		<Dialog
			close={close}
			color={currList.color}
			cta={{
				text: "Save List",
				icon: "save",
				action: () => handleSubmit(),
			}}
			bodyStyle={{
				backgroundImage:
					currList.poster >= 0 && currList.poster < 24
						? `url(${imageBackgroundUrl(currList.poster)})`
						: "none",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				color: color === "bgcolor" ? "var(--tcolor)" : "var(--black)",
				backgroundColor:
					currList.poster >= 0 && currList.poster < 24
						? "rgba(255,255,255,0.65)"
						: `var(--${currList.color}-100)`,
			}}
			title="Edit List"
		>
			<form onSubmit={handleSubmit} className="edit-list-form">
				<Input
					name="title"
					value={currList.title}
					onChange={handleChange}
					placeholder="Title"
					icon="edit"
					type="text"
				/>
				<TextArea
					name="description"
					value={currList.description}
					onChange={handleChange}
					placeholder="Description"
					icon="edit"
					type="text"
				/>
				<div
					className="form-group"
					style={{ justifyContent: "flex-start" }}
				>
					<div className="add-note-form-group">
						<IconButton
							fill={`var(--${currList.color}-400)`}
							icon="palette"
							onClick={(e) => {
								e.preventDefault();
								setOpenColorBox(true);
							}}
						/>
						{openColorBox && (
							<>
								<div className="add-note-color-box">
									<Row>
										{colors.map((thisColor, index) => (
											<Col
												lg={25}
												md={25}
												sm={33}
												key={index}
											>
												<button
													style={{
														width: "2rem",
														height: "2rem",
														backgroundColor: `var(--${thisColor})`,
														borderRadius: "500px",
														margin: "0.5rem",
													}}
													onClick={(e) => {
														e.preventDefault();
														setCurrList((p) => ({
															...p,
															color: thisColor,
														}));
														setOpenColorBox(false);
													}}
												></button>
											</Col>
										))}
									</Row>
								</div>
							</>
						)}
					</div>
					<div className="add-note-form-group">
						<IconButton
							fill={`var(--${currList.color}-400)`}
							icon="image"
							onClick={(e) => {
								e.preventDefault();
								setOpenImageBox(true);
							}}
						/>
						{openImageBox && (
							<>
								<div
									className="add-note-image-box"
									style={{
										width: "20rem",
										height: "12rem",
									}}
								>
									<Row>
										<Col lg={20} md={25} sm={33}>
											<button
												style={{
													width: "2.5rem",
													height: "2.5rem",
													backgroundImage: `url(${slash})`,
													backgroundSize: "100% 100%",
													backgroundPosition:
														"center",
													backgroundRepeat:
														"no-repeat",
													borderRadius: "500px",
													margin: "0.5rem",
												}}
												onClick={(e) => {
													e.preventDefault();
													setCurrList((p) => ({
														...p,
														image: -1,
													}));
													setOpenImageBox(false);
												}}
											></button>
										</Col>
										{notesBackgrounds.map(
											(thisImage, index) => (
												<Col
													lg={20}
													md={25}
													sm={33}
													key={index}
												>
													<button
														style={{
															width: "2.5rem",
															height: "2.5rem",
															backgroundImage: `url(${imageBackgroundUrl(
																index
															)})`,
															backgroundSize:
																"cover",
															backgroundPosition:
																"center",
															backgroundRepeat:
																"no-repeat",
															borderRadius:
																"500px",
															margin: "0.5rem",
														}}
														onClick={(e) => {
															e.preventDefault();
															setCurrList(
																(p) => ({
																	...p,
																	poster: index,
																})
															);
															setOpenImageBox(
																false
															);
														}}
													></button>
												</Col>
											)
										)}
									</Row>
								</div>
							</>
						)}
					</div>
					<div className="add-note-form-group">
						<IconButton
							fill={
								currList.archived
									? `var(--${currList.color}-400)`
									: "transparent"
							}
							icon="archive"
							onClick={(e) => {
								e.preventDefault();
								setCurrList((p) => ({
									...p,
									archived: !p.archived,
								}));
							}}
						/>
					</div>
				</div>
				<div className="form-group">
					<Button
						text="Cancel"
						onClick={(e) => {
							e?.preventDefault();
							setCurrList({
								title,
								color,
								poster,
							});
							close();
						}}
						variant="outline"
					/>
					<Button text="Save Changes" type="submit" />
				</div>
			</form>
			{(openColorBox || openImageBox) && (
				<div
					className="add-note-cover"
					onClick={() => {
						setOpenColorBox(false);
						setOpenImageBox(false);
					}}
				></div>
			)}
		</Dialog>
	);
};

export default EditList;
