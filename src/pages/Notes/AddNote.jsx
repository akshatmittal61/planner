import React, { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import IconButton from "../../components/Button/IconButton";
import Input, { TextArea } from "../../components/Input/Input";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";
import { colors, imageBackgroundUrl } from "../../utils";
import GlobalContext from "../../Context/GlobalContext";
import { slash } from "../../utils/images";

const AddNote = ({ close }) => {
	const { addNewNote } = useContext(GlobalContext);
	const notesBackgrounds = Array(24).fill(null);
	const [newNote, setNewNote] = useState({
		title: "",
		content: "",
		color: "bgcolor",
		image: -1,
		archived: false,
		trashed: false,
	});
	const [openColorBox, setOpenColorBox] = useState(false);
	const [openImageBox, setOpenImageBox] = useState(false);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewNote((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = (e) => {
		e?.preventDefault();
		addNewNote(newNote);
		close();
	};
	const handleReset = (e) => {
		e?.preventDefault();
		setNewNote({
			title: "",
			content: "",
			color: "bgcolor",
			image: -1,
			archived: false,
			trashed: false,
		});
	};
	return (
		<Dialog
			title="Add a new Note"
			cta={{
				text: "Add Note",
				action: handleSubmit,
			}}
			close={close}
			bodyStyle={{
				backgroundImage:
					newNote.image >= 0 && newNote.image < 24
						? `url(${imageBackgroundUrl(newNote.image)})`
						: "none",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundBlendMode: "lighten",
				color:
					newNote.color === "bgcolor"
						? "var(--tcolor)"
						: "var(--black)",
				backgroundColor:
					newNote.image >= 0 && newNote.image < 24
						? "rgba(255,255,255,0.5)"
						: `var(--${newNote.color}-100)`,
			}}
		>
			<form
				className="add-note-form"
				onReset={handleReset}
				onSubmit={handleSubmit}
			>
				<Input
					name="title"
					placeholder="Note Title"
					icon="edit"
					type="text"
					autoFocus
					value={newNote.title}
					onChange={handleChange}
				/>
				<TextArea
					name="content"
					placeholder="Take a Note..."
					icon="notes"
					rows={5}
					value={newNote.content}
					onChange={handleChange}
				/>
				<div
					className="form-group"
					style={{ justifyContent: "flex-start" }}
				>
					<div className="add-note-form-group">
						<IconButton
							fill={`var(--${newNote.color}-400)`}
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
														setNewNote((p) => ({
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
							fill={`var(--${newNote.color}-400)`}
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
									style={{ width: "20rem", height: "12rem" }}
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
													setNewNote((p) => ({
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
															setNewNote((p) => ({
																...p,
																image: index,
															}));
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
								newNote.archived
									? `var(--${newNote.color}-400)`
									: "transparent"
							}
							icon="archive"
							onClick={(e) => {
								e.preventDefault();
								setNewNote((p) => ({
									...p,
									archived: !p.archived,
								}));
							}}
						/>
					</div>
				</div>
				<div className="form-group">
					<Button text="Clear" type="reset" variant="outline" />
					<Button text="Add Note" type="submit" />
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

export default AddNote;
