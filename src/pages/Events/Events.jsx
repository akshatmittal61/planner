import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import Fab from "../../components/Button/Fab";
import Empty from "../../components/Empty/Empty";
import GlobalContext from "../../Context/GlobalContext";
import Row, { Col } from "../../Layout/Responsive";
import AddEvent from "./AddEvent";
import Event from "./Event";
import "./events.css";
import nullEvents from "../../images/nullEvents.svg";

const Events = () => {
	const { getAllEvents, events } = useContext(GlobalContext);
	const [eventsToRender, setEventsToRender] = useState([]);
	const [showAddEventBox, setShowAddEventBox] = useState(false);
	useEffect(() => {
		getAllEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		let allEvents = [...events];
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
		setEventsToRender(newArr);
	}, [events]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className="events">
			{eventsToRender.length > 0 ? (
				<>
					<section className="events-head">
						<span>Events</span>
					</section>
					<section className="events-body">
						{eventsToRender?.map((element, index) => (
							<div className="events-body-section" key={index}>
								<span className="events-body-section__head">
									{element?.month}
								</span>
								<div className="events-body-section__body">
									<Row>
										{element?.eventsOfMonth?.map(
											(event, index) => (
												<Col
													lg={33}
													md={50}
													sm={50}
													key={index}
												>
													<Event {...event} />
												</Col>
											)
										)}
									</Row>
								</div>
							</div>
						))}
					</section>
				</>
			) : (
				<Empty
					img={nullEvents}
					text="No Event Yet"
					cta={{
						text: "Add an Event",
						icon: "add",
						action: () => setShowAddEventBox(true),
					}}
				/>
			)}
			<Fab icon="add" onClick={() => setShowAddEventBox(true)} />
			{showAddEventBox && (
				<AddEvent close={() => setShowAddEventBox(false)} />
			)}
		</main>
	);
};

export default Events;
