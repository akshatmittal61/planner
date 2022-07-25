import moment from "moment";
import React, { useEffect, useState } from "react";
import Fab from "../../components/Button/Fab";
import Row, { Col } from "../../Layout/Responsive";
import { allEvents } from "../../resources";
import AddEvent from "./AddEvent";
import Event from "./Event";
import "./events.css";

const Events = () => {
	const [events, setEvents] = useState([]);
	const [showAddEventBox, setShowAddEventBox] = useState(false);
	useEffect(() => {
		let newEvents = allEvents
			.map((ev) => ({
				...ev,
				date: new Date(ev.date),
			}))
			.sort((a, b) => b.date - a.date);
		let m1 = new Map();
		for (let event of newEvents) {
			let presentDate = `${moment(event.date).format("MMMM YYYY")}`;
			let a = m1.get(presentDate);
			if (!a) m1.set(presentDate, [event]);
			else m1.set(presentDate, [...a, event]);
		}
		let newArr = [];
		for (const [key, value] of m1) {
			newArr = [
				...newArr,
				{
					month: key,
					eventsOfMonth: value,
				},
			];
		}
		setEvents(newArr);
		window.scrollTo(0, 0);
	}, []);
	return (
		<main className="events">
			<section className="events-head">
				<span>Events</span>
			</section>
			<section className="events-body">
				{events.map((element, index) => (
					<div className="events-body-section" key={index}>
						<span className="events-body-section__head">
							{element?.month}
						</span>
						<div className="events-body-section__body">
							<Row>
								{element?.eventsOfMonth.map((event, index) => (
									<Col lg={33} md={50} sm={50} key={index}>
										<Event
											title={event.title}
											description={event.description}
											date={event.date}
											time={event.time}
											type={event.type}
											link={event.link}
										/>
									</Col>
								))}
							</Row>
						</div>
					</div>
				))}
			</section>
			<Fab icon="add" onClick={() => setShowAddEventBox(true)} />
			{showAddEventBox && (
				<AddEvent close={() => setShowAddEventBox(false)} />
			)}
		</main>
	);
};

export default Events;
