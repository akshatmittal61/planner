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
	const { notes, setSideBarLinks } = useContext(GlobalContext);
	const { id } = useParams();
	const [showAddNoteBox, setShowAddNoteBox] = useState(false);
	useEffect(() => {
		setSideBarLinks(notesNavLinks);
	}, [setSideBarLinks]);
	return (
		<main className="notes">
			{notes.length > 0 &&
			notes.some((p) => !p.trashed && p?.lists.includes(id)) ? (
				<section className="notes-body">
					<Masonry>
						{notes?.map(
							(note, index) =>
								!note.trashed &&
								note?.lists.includes(id)(
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
