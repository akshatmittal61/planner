import React, { useEffect, useState } from "react";
import Fab from "../../components/Button/Fab";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";
import { allEvents } from "../../resources";
import Event from "./Event";
import "./events.css";

const Events = () => {
	const [events, setEvents] = useState([]);
	useEffect(() => {
		setEvents(allEvents);
		window.scrollTo(0, 0);
	}, []);
	const [showDialog, setShowDialog] = useState(false);
	return (
		<main className="events">
			<section className="events-head">
				<span>Events</span>
			</section>
			<section className="events-body">
				<div className="events-body-section">
					<span className="events-body-section__head">June 2022</span>
					<div className="events-body-section__body">
						<Row>
							{events.map((event, index) => (
								<Col lg={33} md={50} sm={50} key={index}>
									<Event
										title={event.title}
										date={event.date}
										type={event.type}
									/>
								</Col>
							))}
						</Row>
					</div>
				</div>
			</section>
			<Fab icon="add" onClick={() => setShowDialog(true)} />
			{showDialog && (
				<Dialog
					title="Add a new Event"
					close={() => setShowDialog(false)}
				></Dialog>
			)}
		</main>
	);
};

export default Events;
