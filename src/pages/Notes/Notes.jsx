import React, { useContext, useEffect, useState } from "react";
import Fab from "../../components/Button/Fab";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { notesNavLinks } from "../../navigation";
import { allNotes } from "../../resources";
import AddNote from "./AddNote";
import Note from "./Note";
import "./notes.css";

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [showAddNoteBox, setShowAddNoteBox] = useState(false);
	const { setSideBarLinks } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(notesNavLinks);
		window.scrollTo(0, 0);
		setNotes(allNotes);
	}, [setSideBarLinks]);

	return (
		<main className="notes">
			<section className="notes-body">
				<Masonry>
					{notes.map(
						(note, index) =>
							!note.archived &&
							!note.trashed && (
								<MasonryBox key={index}>
									<Note
										key={index}
										title={note.title}
										color={note.color}
										image={note.image}
										content={note.content}
										trashed={note.trashed}
										archived={note.archived}
									/>
								</MasonryBox>
							)
					)}
				</Masonry>
			</section>
			<Fab icon="edit" onClick={() => setShowAddNoteBox(true)} />
			{showAddNoteBox && (
				<AddNote close={() => setShowAddNoteBox(false)} />
			)}
		</main>
	);
};

export default Notes;
