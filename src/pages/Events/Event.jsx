import React from "react";
import MaterialIcons from "../../components/MaterialIcons";

const Event = ({ type, title, date }) => {
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
	return (
		<div
			className="events-body-event event"
			style={{
				backgroundColor: `var(--${getColor(type)}-100)`,
			}}
		>
			<div className="event__icon">
				<MaterialIcons>{showIcon(type)}</MaterialIcons>
			</div>
			<div className="event-details">
				<div className="event-details__title">{title}</div>
				<div className="event-details__date">{date}</div>
			</div>
		</div>
	);
};

export default Event;
