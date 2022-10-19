import React, { useContext, useState } from "react";
import Chip from "../../components/Chip/Chip";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import Popup from "../../Layout/Popup/Popup";
import Row, { Col } from "../../Layout/Responsive";
import { colors, copy, imageBackgroundUrl, min } from "../../utils";
import NotePopup from "./NotePopup";
import _ from "lodash";

const Note = ({
	title,
	content,
	color,
	image,
	lists,
	trashed,
	archived,
	...rest
}) => {
	const {
		theme,
		archiveNote,
		unArchiveNote,
		moveNoteToTrash,
		restoreNoteFromTrash,
		deleteNote,
		updateOneNote,
		setSnack,
		setOpenSnackBar,
	} = useContext(GlobalContext);
	let chipText = `${title?.slice(0, min(15, title.length))}${
		title.length > 15 ? "..." : ""
	}`;
	const [noteColor, setNoteColor] = useState(color);
	const [openNotePopup, setOpenNotePopup] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [openColorBox, setOpenColorBox] = useState(false);
	const [popupCta, setPopupCta] = useState({
		text: "Move to Trash",
		color: "red",
		icon: "delete",
	});
	const [popupContent, setPopupContent] = useState(
		<>
			Move the note{" "}
			<Chip text={chipText} size="small" color={noteColor} /> to Trash
			Bin?
		</>
	);
	const handleCopy = (e) => {
		e?.preventDefault();
		let ans = `${title} \n${content}\n`;
		if (archived) ans += " \nNote: This Note is in owner's archives";
		if (trashed) ans += " \nNote: This Note is in owner's bin";
		copy(ans);
		setSnack({
			text: "Note copied to your clipboard",
			bgColor: "var(--green)",
			color: "var(--white)",
		});
		setOpenSnackBar(true);
		setTimeout(() => {
			setOpenSnackBar(false);
		}, 5000);
	};

	const updateNoteColor = (thisColor) => {
		if (thisColor !== color) {
			let updatedNote = {};
			updatedNote.color = thisColor;
			updateOneNote(rest._id, updatedNote);
			setNoteColor(thisColor);
			setOpenColorBox(false);
		}
	};
	const predictIcon = (text) => {
		switch (_.kebabCase(text)) {
			case "home":
				return "home";
			case "work":
				return "work";
			case "personal":
				return "person";
			case "shopping":
				return "shopping_cart";
			case "study":
				return "school";
			case "travel":
				return "flight";
			case "finance":
				return "attach_money";
			case "health":
				return "local_hospital";
			case "food":
				return "restaurant";
			case "write-ups":
				return "history_edu";
			case "draw":
				return "brush";
			case "music":
				return "music_note";
			case "movies":
				return "movie";
			case "games":
				return "sports_esports";
			case "sports":
				return "sports";
			case "books":
				return "menu_book";
			case "design":
				return "draw";
			case "programming":
				return "code";
			default:
				return "label";
		}
	};
	return (
		<div
			className="note"
			style={{
				backgroundImage:
					image >= 0 && image < 24
						? `url(${imageBackgroundUrl(image)})`
						: "none",
				backgroundBlendMode: "lighten",
				backgroundColor:
					image >= 0 && image < 24
						? "rgba(255,255,255,0.65)"
						: `var(--${noteColor}-${
								theme === "light" ? "100" : "700"
						  })`,
			}}
		>
			<div className="note-title" onClick={() => setOpenNotePopup(true)}>
				<span>{title}</span>
			</div>
			<div
				className="note-content"
				onClick={() => setOpenNotePopup(true)}
			>
				{content}
			</div>
			{lists.length > 0 && (
				<div className="note-lists">
					{lists
						.sort((a, b) =>
							a.title < b.title ? -1 : a.title > b.title ? 1 : 0
						)
						.map((list, id) => (
							<Chip
								text={list.title}
								key={id}
								color={list?.color}
								size="small"
								link={`/notes/list/${list._id}`}
								icon={predictIcon(list.title)}
								style={{
									borderColor: `var(--${list?.color}-100)`,
									boxShadow: "var(--shadow-elevation-2dp)",
								}}
							/>
						))}
				</div>
			)}
			<div className="note-buttons">
				{!trashed ? (
					<>
						<button
							className="note-button"
							title="Background Color"
							onClick={() => setOpenColorBox(!openColorBox)}
						>
							<MaterialIcons>palette</MaterialIcons>
						</button>
						<button
							onClick={handleCopy}
							className="note-button"
							title="Copy Note"
						>
							<MaterialIcons>content_copy</MaterialIcons>
						</button>
						{/* <button className="note-button" title="Add to list">
							<MaterialIcons>playlist_add</MaterialIcons>
						</button> */}
						{archived ? (
							<button
								className="note-button"
								title="Unarchive Note"
								onClick={() => {
									setPopupCta(() => ({
										text: "Unarchive Note",
										color: "green",
										icon: "unarchive",
										onClick: () => {
											unArchiveNote(rest._id);
											setOpenPopup(false);
										},
									}));
									setPopupContent(() => (
										<>
											Archive Note{" "}
											<Chip
												text={chipText}
												size="small"
												color={noteColor}
											/>{" "}
											?
										</>
									));
									setOpenNotePopup(false);
									setOpenPopup(true);
								}}
							>
								<MaterialIcons>unarchive</MaterialIcons>
							</button>
						) : (
							<button
								className="note-button"
								title="Archive Note"
								onClick={() => {
									setPopupCta(() => ({
										text: "Archive Note",
										color: "green",
										icon: "archive",
										onClick: () => {
											archiveNote(rest._id);
											setOpenPopup(false);
										},
									}));
									setPopupContent(() => (
										<>
											Archive Note{" "}
											<Chip
												text={chipText}
												size="small"
												color={noteColor}
											/>{" "}
											?
										</>
									));
									setOpenNotePopup(false);
									setOpenPopup(true);
								}}
							>
								<MaterialIcons>archive</MaterialIcons>
							</button>
						)}
						<button
							className="note-button"
							title="Delete Note"
							onClick={() => {
								setPopupCta(() => ({
									text: "Move to Trash",
									color: "red",
									icon: "delete",
									onClick: () => {
										moveNoteToTrash(rest._id);
										setOpenPopup(false);
									},
								}));
								setPopupContent(() => (
									<>
										Move the note{" "}
										<Chip
											text={chipText}
											size="small"
											color={noteColor}
										/>{" "}
										to Trash Bin?
									</>
								));
								setOpenNotePopup(false);
								setOpenPopup(true);
							}}
						>
							<MaterialIcons>delete</MaterialIcons>
						</button>
					</>
				) : (
					<>
						<button
							className="note-button"
							title="Restore Note"
							onClick={() => {
								setPopupCta(() => ({
									text: "Restore Note",
									color: "green",
									icon: "restore",
									onClick: () => {
										restoreNoteFromTrash(rest._id);
										setOpenPopup(false);
									},
								}));
								setPopupContent(() => (
									<>
										Restore note{" "}
										<Chip
											text={chipText}
											size="small"
											color={noteColor}
										/>{" "}
										?
									</>
								));
								setOpenNotePopup(false);
								setOpenPopup(true);
							}}
						>
							<MaterialIcons>restore</MaterialIcons>
						</button>
						<button
							className="note-button"
							title="Delete forever"
							onClick={() => {
								setPopupCta(() => ({
									text: "Delete forever",
									color: "red",
									icon: "delete",
									onClick: () => {
										deleteNote(rest._id);
										setOpenPopup(false);
									},
								}));
								setPopupContent(() => (
									<>
										Delete note{" "}
										<Chip
											text={chipText}
											size="small"
											color={noteColor}
										/>{" "}
										forever? This actions can't be undone.
									</>
								));
								setOpenNotePopup(false);
								setOpenPopup(true);
							}}
						>
							<MaterialIcons>delete_forever</MaterialIcons>
						</button>
					</>
				)}
			</div>
			{openNotePopup && (
				<NotePopup
					title={title}
					content={content}
					color={noteColor}
					image={image}
					archived={archived}
					trashed={trashed}
					close={() => setOpenNotePopup(false)}
					{...rest}
				/>
			)}
			{openPopup && (
				<Popup
					width="50%"
					height="fit-content"
					breakpoints={{
						tab: ["60%", "fit-content"],
						mobile: ["90%", "fit-content"],
					}}
					cta={popupCta}
					close={() => setOpenPopup(false)}
				>
					<span style={{ fontSize: "1.25rem", lineHeight: "1.5rem" }}>
						{popupContent}
					</span>
				</Popup>
			)}

			{openColorBox && (
				<>
					<div
						className="note-color-overlay"
						onClick={() => setOpenColorBox(false)}
					></div>
					<div className="note-color-update-box">
						<Row>
							{colors.map((thisColor, index) => (
								<Col lg={25} md={25} sm={33} key={index}>
									<button
										style={{
											width: "2.5rem",
											height: "2.5rem",
											backgroundColor: `var(--${thisColor})`,
											borderRadius: "500px",
											margin: "0.5rem",
										}}
										onClick={(e) => {
											e.preventDefault();
											updateNoteColor(thisColor);
										}}
									></button>
								</Col>
							))}
						</Row>
					</div>
				</>
			)}
		</div>
	);
};

export default Note;
