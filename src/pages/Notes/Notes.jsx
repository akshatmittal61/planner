import React, { useContext, useEffect, useState } from "react";
import Fab from "../../components/Button/Fab";
import Empty from "../../components/Empty/Empty";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { notesNavLinks } from "../../utils/navigation";
import AddNote from "./AddNote";
import Note from "./Note";
import "./notes.css";
import nullNotes from "../../images/nullNotes.svg";

const Notes = () => {
	const [showAddNoteBox, setShowAddNoteBox] = useState(false);
	const { setSideBarLinks, getAllNotes, notes } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(notesNavLinks);
		window.scrollTo(0, 0);
		getAllNotes();
		console.log(notes);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className="notes">
			{notes.length > 0 ? (
				<section className="notes-body">
					<Masonry>
						{notes?.map(
							(note, index) =>
								!note.archived &&
								!note.trashed && (
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

export default Notes;
