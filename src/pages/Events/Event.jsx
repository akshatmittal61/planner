import moment from "moment";
import React, { useContext, useState } from "react";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import EventPopup from "./EventPopup";

const Event = ({ title, description, date, time, type, link }) => {
	const { theme } = useContext(GlobalContext);
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
	return (
		<div
			className="events-body-event event"
			style={{
				backgroundColor: `var(--${getColor(type)}-${
					theme === "light" ? "100" : "700"
				})`,
			}}
			onClick={() => setOpenEventPopup(true)}
		>
			<div className="event__icon">
				<MaterialIcons>{showIcon(type)}</MaterialIcons>
			</div>
			<div className="event-details">
				<div className="event-details__title">{title}</div>
				<div className="event-details__date">
					{moment(date).format("YYYY-MMM-DD")}
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
					close={() => setOpenEventPopup(() => false)}
				/>
			)}
		</div>
	);
};

export default Event;
