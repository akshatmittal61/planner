import React, { useContext, useState } from "react";
import moment from "moment";
import Input, { TextArea } from "../../components/Input/Input";
import MaterialIcons from "../../components/MaterialIcons";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";
import GlobalContext from "../../Context/GlobalContext";

const EventPopup = ({
	close,
	title,
	description,
	date,
	time,
	type,
	link,
	color,
	...rest
}) => {
	let originalEvent = { title, description, date, time, type, link };
	const { user, updateOneEvent } = useContext(GlobalContext);
	const [edit, setEdit] = useState(false);
	const [currEvent, setCurrEvent] = useState({
		title,
		description,
		date,
		time,
		type,
		link,
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCurrEvent((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = async (e) => {
		e?.preventDefault();
		let editedEvent = { username: user.username };
		for (let i in currEvent) {
			if (currEvent[i] !== originalEvent[i])
				editedEvent = { ...editedEvent, [i]: currEvent[i] };
		}
		updateOneEvent(rest._id, editedEvent);
	};
	return (
		<Dialog
			title={currEvent.title}
			close={close}
			cta={{
				text: edit ? "Save Changes" : "Edit Event",
				icon: edit ? "save" : "edit",
				action: () => {
					if (edit) handleSubmit();
					setEdit((p) => !p);
				},
				color: color,
			}}
			color={color}
		>
			<div className="event-dialog" style={{ margin: "1rem 0" }}>
				<form className="event-dialog-form" onSubmit={handleSubmit}>
					<Input
						name="title"
						placeholder="Event Title"
						icon="edit"
						disabled={!edit}
						value={currEvent.title}
						onChange={handleChange}
					/>
					<TextArea
						name="description"
						placeholder="Event Description"
						icon="notes"
						rows={5}
						value={currEvent.description}
						onChange={handleChange}
						disabled={!edit}
					/>
					<Row>
						<Col lg={50} md={50} sm={100}>
							<Input
								type="date"
								name="date"
								disabled={!edit}
								value={moment(currEvent.date).format(
									"yyyy-MM-DD"
								)}
								onChange={handleChange}
								icon="calendar_month"
								placeholder="Event Date"
							/>
						</Col>
						{(currEvent.time !== "" || edit) && (
							<Col lg={50} md={50} sm={100}>
								<Input
									name="time"
									disabled={!edit}
									value={currEvent.time}
									icon="schedule"
									type="time"
									placeholder="Event Time"
									onChange={handleChange}
								/>
							</Col>
						)}

						<Col
							lg={
								currEvent.type === "meeting" &&
								(currEvent?.link !== "" || edit)
									? 50
									: 100
							}
							md={50}
							sm={100}
						>
							<Input
								name="type"
								disabled={!edit}
								value={currEvent.type}
								icon="event"
								placeholder="Event Type"
								onChange={handleChange}
							/>
						</Col>
						{currEvent.type === "meeting" &&
							(currEvent?.link !== "" || edit) && (
								<Col
									lg={
										currEvent.type === "meeting" &&
										(currEvent?.link !== "" || edit)
											? 50
											: 100
									}
									md={
										currEvent.type === "meeting" &&
										(currEvent?.link !== "" || edit)
											? 50
											: 100
									}
									sm={100}
								>
									{edit ? (
										<Input
											name="link"
											type="url"
											value={currEvent?.link}
											icon="link"
											placeholder="Event Link"
											onChange={handleChange}
										/>
									) : (
										<a
											href={currEvent?.link}
											target="_blank"
											style={{
												width: "90%",
												margin: "2rem 1rem",
												display: "flex",
											}}
											rel="noreferrer"
										>
											<MaterialIcons
												style={{
													color: "var(--indigo)",
													margin: "0 0.5rem",
												}}
											>
												link
											</MaterialIcons>
											{currEvent?.link?.length > 8 &&
											currEvent?.link.substr(0, 8) ===
												"https://"
												? currEvent?.link.substr(
														8,
														currEvent?.link.length
												  )
												: currEvent?.link}
										</a>
									)}
								</Col>
							)}
					</Row>
				</form>
			</div>
		</Dialog>
	);
};

export default EventPopup;
