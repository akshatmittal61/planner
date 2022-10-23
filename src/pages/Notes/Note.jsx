import React, { useContext, useEffect, useState } from "react";
import Chip from "../../components/Chip/Chip";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import Popup from "../../Layout/Popup/Popup";
import Row, { Col } from "../../Layout/Responsive";
import {
	colors,
	copy,
	imageBackgroundUrl,
	min,
	predictIcon,
} from "../../utils";
import NotePopup from "./NotePopup";

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
		lists: allLists,
		createNewList,
		addNoteToList,
		removeNoteFromList,
	} = useContext(GlobalContext);
	let chipText = `${title?.slice(0, min(15, title.length))}${
		title.length > 15 ? "..." : ""
	}`;
	const [noteColor, setNoteColor] = useState(color);
	const [openNotePopup, setOpenNotePopup] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [openColorBox, setOpenColorBox] = useState(false);
	const [openListsBox, setOpenListsBox] = useState(false);
	const [showAddListButton, setshowAddListButton] = useState(false);
	const [newListTitle, setNewListTitle] = useState("");
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

	const addNewList = async () => {
		if (newListTitle !== "") {
			const newCreatedList = await createNewList({
				title: newListTitle,
				colors: colors[Math.floor(Math.random() * colors.length)],
				description: "",
			});
			addNoteToList(rest._id, newCreatedList._id);
			setNewListTitle("");
			setshowAddListButton(false);
		}
	};

	const close = () => {
		setOpenColorBox(() => false);
		setOpenListsBox(() => false);
		setOpenNotePopup(() => false);
		setOpenPopup(() => false);
		setOpenSnackBar(() => false);
	};

	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
		return () => {
			document.removeEventListener("keydown", (e) => {
				if (e.key === "Escape") close();
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
									color: "var(--black)",
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
						<button
							className="note-button"
							title="Manage Lists"
							onClick={() => setOpenListsBox(true)}
						>
							<MaterialIcons>sort</MaterialIcons>
						</button>
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
										forever? This action can't be undone.
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

			{openListsBox && (
				<>
					<div
						className="note-lists-overlay"
						onClick={() => setOpenListsBox(false)}
					></div>
					<div className="note-lists-update-box">
						<button
							className="icon note-lists-update-box__close"
							onClick={() => setOpenListsBox(false)}
						>
							<MaterialIcons>close</MaterialIcons>
						</button>
						<div className="note-lists-update-box__title">
							<MaterialIcons>list</MaterialIcons>
							<span>Lists</span>
						</div>
						<div className="note-lists-update-box__body">
							{lists.length > 0 && (
								<div className="note-lists-update-box__body__lists">
									<h2>Labels</h2>
									<p>
										{allLists?.map(
											(list, index) =>
												lists?.some(
													(noteList) =>
														noteList._id ===
														list._id
												) && (
													<Chip
														key={index}
														text={list.title}
														size="small"
														color={list.color}
														icon={predictIcon(
															list.title
														)}
														variant="fill"
														onClick={() =>
															removeNoteFromList(
																rest._id,
																list._id
															)
														}
														style={{
															backgroundColor: `var(--${list.color}-700)`,
															color: `var(--white)`,
															borderColor: `var(--${list.color}-700)`,
														}}
													/>
												)
										)}
									</p>
								</div>
							)}
							<div className="note-lists-update-box__body__lists">
								<h2>Add labels (suggestions)</h2>
								<p>
									{allLists?.map(
										(list, index) =>
											!lists?.some(
												(noteList) =>
													noteList._id === list._id
											) && (
												<Chip
													key={index}
													text={list.title}
													size="small"
													color={list.color}
													icon={predictIcon(
														list.title
													)}
													variant="outline"
													onClick={() =>
														addNoteToList(
															rest._id,
															list._id
														)
													}
													style={{
														backgroundColor: `transparent`,
														color:
															theme === "light"
																? `var(--black)`
																: `var(--white)`,
														borderColor: `var(--${list.color}-700)`,
													}}
												/>
											)
									)}
									<Chip
										text={
											showAddListButton ? (
												<input
													placeholder="Create a new list"
													value={newListTitle}
													onChange={(e) =>
														setNewListTitle(
															e.target.value
														)
													}
													onKeyDown={(e) => {
														if (e.key === "Enter") {
															e?.preventDefault();
															addNewList();
														}
													}}
													style={{
														all: "unset",
														textAlign: "left",
														width: "fit-content",
														display: "inline-flex",
													}}
												/>
											) : (
												"Add New List"
											)
										}
										size="small"
										color={`var(--${noteColor}-100)`}
										icon="add"
										style={{
											borderColor: `var(--${noteColor}-100)`,
											cursor: showAddListButton
												? "text"
												: "pointer",
										}}
										onClick={() => {
											if (!showAddListButton)
												setshowAddListButton(true);
										}}
									/>
								</p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Note;
