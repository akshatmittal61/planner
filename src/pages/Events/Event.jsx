import moment from "moment";
import React, { useContext, useState } from "react";
import IconButton from "../../components/Button/IconButton";
import Chip from "../../components/Chip/Chip";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import Popup from "../../Layout/Popup/Popup";
import EventPopup from "./EventPopup";

const Event = ({
	title,
	description,
	date,
	time,
	type,
	link,
	trashed,
	...rest
}) => {
	const { theme, moveEventToTrash, restoreEventFromTrash, deleteEvent } =
		useContext(GlobalContext);
	const showIcon = (e) => {
		switch (e) {
			case "birthday":
				return "cake";
			case "anniversary":
				return "cake";
			case "meeting":
				return "group";
			case "festival":
				return "festival";
			case "ceremony":
				return "celebration";
			default:
				return "event";
		}
	};
	const getColor = (e) => {
		switch (e) {
			case "birthday":
				return "blue";
			case "anniversary":
				return "pink";
			case "meeting":
				return "indigo";
			case "festival":
				return "purple";
			case "ceremony":
				return "green";
			default:
				return "bgcolor";
		}
	};
	const [openEventPopup, setOpenEventPopup] = useState(false);
	const [openTrashPopup, setOpenTrashPopup] = useState(false);
	const [popupCta, setPopupCta] = useState({
		text: "Move to Trash",
		color: "red",
		icon: "delete",
		onClick: () => {
			moveEventToTrash(rest._id);
			setOpenTrashPopup(false);
		},
	});
	const [popupContent, setPopupContent] = useState(
		<>
			Move the event{" "}
			<Chip text={title} size="small" color={getColor(type)} /> to Trash
			Bin?
		</>
	);
	return (
		<div
			className="events-body-event event"
			style={{
				backgroundColor: `var(--${getColor(type)}-${
					theme === "light" ? "100" : "700"
				})`,
			}}
		>
			<div
				className="event__icon"
				onClick={() => setOpenEventPopup(true)}
			>
				<MaterialIcons>{showIcon(type)}</MaterialIcons>
			</div>
			<div className="event-details">
				<div
					className="event-details__title"
					onClick={() => setOpenEventPopup(true)}
				>
					{title}
				</div>
				<div
					className="event-details__date"
					onClick={() => setOpenEventPopup(true)}
				>
					{moment(date).format("YYYY-MMM-DD")}
				</div>
				<div className="event-details__delete">
					{trashed ? (
						<>
							<IconButton
								icon="restore"
								fill="var(--back-shadow-light)"
								title="Restore Event"
								onClick={() => {
									setPopupCta(() => ({
										text: "Restore Event",
										color: "green",
										icon: "restore",
										onClick: () => {
											restoreEventFromTrash(rest._id);
											setOpenTrashPopup(false);
										},
									}));
									setPopupContent(() => (
										<>
											Restore event{" "}
											<Chip
												text={title}
												size="small"
												color={getColor(type)}
											/>{" "}
											?
										</>
									));
									setOpenEventPopup(false);
									setOpenTrashPopup(true);
								}}
							/>
							<IconButton
								icon="delete_forever"
								fill="var(--back-shadow-light)"
								title="Delete Event Forever"
								onClick={() => {
									setPopupCta(() => ({
										text: "Delete Event Forever",
										color: "red",
										icon: "delete_forever",
										onClick: () => {
											deleteEvent(rest._id);
											setOpenTrashPopup(false);
										},
									}));
									setPopupContent(() => (
										<>
											Delete event{" "}
											<Chip
												text={title}
												size="small"
												color={getColor(type)}
											/>{" "}
											forever? This action can't be
											undone.
										</>
									));
									setOpenEventPopup(false);
									setOpenTrashPopup(true);
								}}
							/>
						</>
					) : (
						<IconButton
							icon="delete"
							fill="var(--back-shadow-light)"
							title="Move Event to Trash"
							onClick={() => {
								setPopupCta(() => ({
									text: "Move to Trash",
									color: "red",
									icon: "delete",
									onClick: () => {
										moveEventToTrash(rest._id);
										setOpenTrashPopup(false);
									},
								}));
								setPopupContent(() => (
									<>
										Move the event{" "}
										<Chip
											text={title}
											size="small"
											color={getColor(type)}
										/>{" "}
										to Trash Bin?
									</>
								));
								setOpenEventPopup(false);
								setOpenTrashPopup(true);
							}}
						/>
					)}
				</div>
			</div>
			{openEventPopup && (
				<EventPopup
					title={title}
					description={description}
					date={date}
					time={time}
					type={type}
					link={link}
					color={getColor(type)}
					close={() => setOpenEventPopup(() => false)}
					{...rest}
				/>
			)}
			{openTrashPopup && (
				<Popup
					width="50%"
					height="fit-content"
					breakpoints={{
						tab: ["60%", "fit-content"],
						mobile: ["90%", "fit-content"],
					}}
					cta={popupCta}
					close={() => setOpenTrashPopup(false)}
				>
					<span style={{ fontSize: "1.25rem", lineHeight: "1.5rem" }}>
						{popupContent}
					</span>
				</Popup>
			)}
		</div>
	);
};

export default Event;
