import React, { useEffect, useState } from "react";
import { allEvents } from "../../resources";
import Event from "./Event";
import "./events.css";

const Events = () => {
	const [events, setEvents] = useState([]);
	useEffect(() => {
		setEvents(allEvents);
	}, []);
	return (
		<main className="events">
			<section className="events-head">
				<span>Events</span>
			</section>
			<section className="events-body">
				<div className="events-body-section">
					<span className="events-body-section__head">June 2022</span>
					<div className="events-body-section__body">
						<div className="row">
							{events.map((event, index) => (
								<div
									className="col-lg-33 col-md-50 col-sm-50"
									key={index}
								>
									<Event
										title={event.title}
										date={event.date}
										type={event.type}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Events;
