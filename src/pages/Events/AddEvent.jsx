import React, { useState } from "react";
import Input, { Select, TextArea } from "../../components/Input/Input";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";

const AddEvent = ({ close }) => {
	const [newEvent, setNewEvent] = useState({
		title: "",
		description: "",
		date: "",
		time: "",
		type: "",
		meeting: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewEvent((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<Dialog
			title="Add a new Event"
			cta={{ text: "Add Event", action: handleSubmit }}
			close={close}
		>
			<form className="add-event-form" onSubmit={handleSubmit}>
				<Input
					name="title"
					placeholder="Event Title"
					icon="edit"
					type="text"
					autoFocus
					value={newEvent.title}
					onChange={handleChange}
				/>
				<TextArea
					name="description"
					placeholder="Event Description"
					icon="notes"
					rows={5}
					value={newEvent.description}
					onChange={handleChange}
				/>
				<Row>
					<Col lg={50} md={50} sm={100}>
						<Input
							name="date"
							placeholder="Event Date"
							type="date"
							icon="calendar_month"
							value={newEvent.date}
							onChange={handleChange}
						/>
					</Col>
					<Col lg={50} md={50} sm={100}>
						<Input
							name="time"
							placeholder="Event Time"
							type="time"
							icon="schedule"
							value={newEvent.time}
							onChange={handleChange}
						/>
					</Col>
				</Row>
				<Select
					name="type"
					placeholder="Event Type"
					type="text"
					icon="event"
					value={newEvent.type}
					selected={(a) => setNewEvent((p) => ({ ...p, type: a }))}
					options={[
						"birthday",
						"anniversary",
						"meeting",
						"festival",
						"ceremony",
					]}
				/>
			</form>
		</Dialog>
	);
};

export default AddEvent;
