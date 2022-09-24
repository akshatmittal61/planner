import React, { useContext, useEffect, useState } from "react";
import Fab from "../../components/Button/Fab";
import Empty from "../../components/Empty/Empty";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { nullNotes } from "../../utils/images";
import { notesNavLinks } from "../../utils/navigation";
import AddNote from "./AddNote";
import Note from "./Note";
import "./notes.css";

const Notes = () => {
	const [showAddNoteBox, setShowAddNoteBox] = useState(false);
	const { setSideBarLinks, notes } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(notesNavLinks);
	}, [setSideBarLinks]);

	return (
		<main className="notes">
			{notes.length > 0 &&
			notes.some((p) => !p.archived && !p.trashed) ? (
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
