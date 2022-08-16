import React, { useContext, useEffect } from "react";
import Empty from "../../components/Empty/Empty";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { notesNavLinks } from "../../utils/navigation";
import Note from "./Note";
import nullArchive from "../../images/nullArchive.svg";

const NotesArchived = () => {
	const { setSideBarLinks, getAllNotes, notes } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(notesNavLinks);
		window.scrollTo(0, 0);
		getAllNotes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setSideBarLinks]);
	return (
		<main className="notes">
			<section className="notes-body">
				{notes.some((p) => p.archived) ? (
					<Masonry>
						{notes.map(
							(note, index) =>
								!note.trashed &&
								note.archived && (
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
				) : (
					<Empty
						img={nullArchive}
						text="Archived Notes will be shown here."
					/>
				)}
			</section>
		</main>
	);
};

export default NotesArchived;
