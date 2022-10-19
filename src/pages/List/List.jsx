import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Fab from "../../components/Button/Fab";
import Empty from "../../components/Empty/Empty";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { nullNotes } from "../../utils/images";
import { notesNavLinks } from "../../utils/navigation";
import AddNote from "../Notes/AddNote";
import Note from "../Notes/Note";
import "../Notes/notes.css";

const List = () => {
	const { setSideBarLinks, getAllLists, getNotesInList } =
		useContext(GlobalContext);
	const { id } = useParams();
	const [showAddNoteBox, setShowAddNoteBox] = useState(false);
	const [notesInThisList, setNotesInThisList] = useState([]);
	const fetchNotesInList = async () => {
		setNotesInThisList(await getNotesInList(id));
	};
	useEffect(() => {
		setSideBarLinks(notesNavLinks);
		getAllLists();
		fetchNotesInList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	return (
		<main className="notes">
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
