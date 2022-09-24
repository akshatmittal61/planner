import React, { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import Input, { TextArea } from "../../components/Input/Input";
import GlobalContext from "../../Context/GlobalContext";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";

const AddEvent = ({ close }) => {
	const { accentColor, addNewEvent } = useContext(GlobalContext);
	const [newEvent, setNewEvent] = useState({
		title: "",
		description: "",
		date: "",
		time: "",
		type: "",
		link: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewEvent((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = async (e) => {
		e?.preventDefault();
		addNewEvent(newEvent);
	};
	const handleReset = (e) => {
		e?.preventDefault();
		setNewEvent({
			title: "",
			description: "",
			date: "",
			time: "",
			type: "",
			link: "",
		});
	};
	return (
		<Dialog
			title="Add a new Event"
			cta={{ text: "Add Event", action: handleSubmit }}
			close={close}
		>
			<form
				className="add-event-form"
				onReset={handleReset}
				onSubmit={handleSubmit}
			>
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
				<Input
					name="type"
					placeholder="Event Type"
					type="text"
					icon="event"
					list="typeSuggestions"
					value={newEvent.type}
					onChange={handleChange}
				/>
				<datalist id="typeSuggestions">
					<option value="birthday" />
					<option value="anniversary" />
					<option value="meeting" />
					<option value="festival" />
					<option value="ceremony" />
				</datalist>
				{newEvent.type === "meeting" && (
					<Input
						name="link"
						placeholder="Meeting Link"
						type="url"
						icon="link"
						value={newEvent.link}
						onChange={handleChange}
					/>
				)}
				<div className="form-group">
					<Button
						text="Clear"
						type="reset"
						variant="outline"
						color={accentColor}
					/>
					<Button
						text="Add Event"
						type="submit"
						color={accentColor}
					/>
				</div>
			</form>
		</Dialog>
	);
};

export default AddEvent;
