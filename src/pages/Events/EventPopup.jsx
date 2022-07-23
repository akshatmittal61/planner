import moment from "moment";
import React, { useState } from "react";
import Input, { TextArea } from "../../components/Input/Input";
import MaterialIcons from "../../components/MaterialIcons";
import Popup from "../../Layout/Popup/Popup";
import Row, { Col } from "../../Layout/Responsive";

const EventPopup = ({ close, title, description, date, time, type, link }) => {
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
	return (
		<Popup
			close={close}
			title={currEvent.title}
			height="fit-content"
			cta={{
				text: edit ? "Save Changes" : "Edit Event",
				icon: edit ? "save" : "edit",
				onClick: () => {
					if (edit) console.log(currEvent);
					setEdit((p) => !p);
				},
			}}
		>
			<div className="event-popup" style={{ margin: "1rem 0" }}>
				<Row>
					<Col lg={100} md={100} sm={100}>
						<TextArea
							disabled={!edit}
							name="description"
							value={currEvent.description}
							icon="notes"
							placeholder="Event Description"
							rows={4}
							onChange={handleChange}
						/>
					</Col>
					<Col
						lg={currEvent.time || edit ? 50 : 100}
						md={currEvent.time || edit ? 50 : 100}
						sm={100}
					>
						<Input
							type="date"
							name="date"
							disabled={!edit}
							value={moment(currEvent.date).format("yyyy-MM-DD")}
							onChange={handleChange}
							icon="calendar_month"
							placeholder="Event Date"
							style={{ margin: "1rem 0" }}
						/>
					</Col>
					{(currEvent.time || edit) && (
						<Col lg={50} md={50} sm={100}>
							<Input
								name="time"
								disabled={!edit}
								value={currEvent.time}
								icon="schedule"
								type="time"
								placeholder="Event Time"
								style={{ margin: "1rem 0" }}
								onChange={handleChange}
							/>
						</Col>
					)}
					<Col
						lg={
							currEvent.type === "meeting" &&
							(currEvent.link !== "" || edit)
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
							style={{ margin: "1rem 0" }}
							onChange={handleChange}
						/>
					</Col>
					{currEvent.type === "meeting" &&
						(currEvent.link !== "" || edit) && (
							<Col
								lg={
									currEvent.type === "meeting" &&
									(currEvent.link !== "" || edit)
										? 50
										: 100
								}
								md={
									currEvent.type === "meeting" &&
									(currEvent.link !== "" || edit)
										? 50
										: 100
								}
								sm={100}
							>
								{edit ? (
									<Input
										name="link"
										type="url"
										value={currEvent.link}
										icon="link"
										placeholder="Event Link"
										style={{ margin: "1rem 0" }}
										onChange={handleChange}
									/>
								) : (
									<a
										href={currEvent.link}
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
										{currEvent.link.substr(0, 8) ===
										"https://"
											? currEvent.link.substr(
													8,
													currEvent.link.length
											  )
											: currEvent.link}
									</a>
								)}
							</Col>
						)}
				</Row>
			</div>
		</Popup>
	);
};

export default EventPopup;
