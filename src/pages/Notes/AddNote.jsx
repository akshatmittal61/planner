import React, { useState } from "react";
import Button from "../../components/Button/Button";
import IconButton from "../../components/Button/IconButton";
import Input, { TextArea } from "../../components/Input/Input";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";

const AddNote = ({ close }) => {
	const colors = [
		"bgcolor",
		"red",
		"pink",
		"purple",
		"dark-purple",
		"indigo",
		"blue",
		"light-blue",
		"cyan",
		"green",
		"light-green",
		"orange",
		"brown",
		"grey",
		"blue-grey",
	];
	const [newNote, setNewNote] = useState({
		title: "",
		content: "",
		color: "indigo",
		image: "",
		archived: false,
		trashed: false,
	});
	const [openColorBox, setOpenColorBox] = useState(false);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewNote((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(newNote);
		setNewNote({
			title: "",
			content: "",
			color: "indigo",
			image: "",
			archived: false,
			trashed: false,
		});
	};
	const handleReset = (e) => {
		e.preventDefault();
		setNewNote({
			title: "",
			content: "",
			color: "indigo",
			image: "",
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
				<div className="add-note-form-group">
					<IconButton
						fill={`var(--${newNote.color}-100)`}
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
						fill={`var(--${newNote.color}-100)`}
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
				<div className="form-group">
					<Button text="Clear" type="reset" variant="outline" />
					<Button text="Add Note" type="submit" />
				</div>
			</form>
			{openColorBox && (
				<div
					className="add-note-cover"
					onClick={() => setOpenColorBox(false)}
				></div>
			)}
		</Dialog>
	);
};

export default AddNote;
