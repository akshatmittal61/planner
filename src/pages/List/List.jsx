import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fab from "../../components/Button/Fab";
import Empty from "../../components/Empty/Empty";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { imageBackgroundUrl } from "../../utils";
import { nullNotes } from "../../utils/images";
import { notesNavLinks } from "../../utils/navigation";
import AddNote from "../Notes/AddNote";
import Note from "../Notes/Note";
import "../Notes/notes.css";

const List = () => {
	const { setSideBarLinks, getAllLists, notes, lists } =
		useContext(GlobalContext);
	const { id } = useParams();
	const [list, setList] = useState(null);
	const [showAddNoteBox, setShowAddNoteBox] = useState(false);
	const [notesInThisList, setNotesInThisList] = useState([]);
	const fetchNotesInList = async () => {
		setNotesInThisList(() => []);
		for (let note of notes) {
			if (note.lists.find((list) => list._id === id))
				setNotesInThisList((prev) => [...prev, note]);
		}
	};
	useEffect(() => {
		setSideBarLinks(notesNavLinks);
		getAllLists();
		setList(lists.find((list) => list._id === id));
		fetchNotesInList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, notes]);
	return (
		<main
			className="notes"
			style={{
				width: "100%",
				backgroundImage:
					list?.poster >= 0 && list?.poster < 24
						? `url(${imageBackgroundUrl(list?.poster)})`
						: "none",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				color:
					list?.color === "bgcolor"
						? "var(--tcolor)"
						: "var(--black)",
				backgroundBlendMode:
					list?.poster >= 0 && list?.poster < 24 ? "lighten" : "none",
				backgroundColor:
					list?.poster >= 0 && list?.poster < 24
						? "rgba(255,255,255,0.65)"
						: `var(--${list?.color}-100)`,
				backgroundAttachment: "fixed",
			}}
		>
			{notesInThisList.length > 0 &&
			notesInThisList.some(
				(p) =>
					!p.trashed &&
					p?.lists?.filter((l) => l._id === id).length > 0
			) ? (
				<section className="notes-body">
					<Masonry>
						{notesInThisList?.map(
							(note, index) =>
								!note.trashed &&
								note?.lists?.filter((l) => l._id === id)
									.length > 0 && (
									<MasonryBox key={index}>
										<Note {...note} />
									</MasonryBox>
								)
						)}
					</Masonry>
				</section>
			) : (
				<Empty
					img={nullNotes}
					text="No Note Yet"
					cta={{
						text: "Add a note",
						icon: "add",
						action: () => setShowAddNoteBox(true),
					}}
				/>
			)}
			<Fab icon="edit" onClick={() => setShowAddNoteBox(true)} />
			{showAddNoteBox && (
				<AddNote close={() => setShowAddNoteBox(false)} />
			)}
		</main>
	);
};

export default List;
