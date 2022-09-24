import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Context/GlobalContext";
import { eventsNavLinks } from "../../utils/navigation";
import moment from "moment";
import Empty from "../../components/Empty/Empty";
import Row, { Col } from "../../Layout/Responsive";
import Event from "./Event";
import { nullTrash } from "../../utils/images";

const EventsTrash = () => {
	const [eventsToRender, setEventsToRender] = useState([]);
	const { setSideBarLinks, events } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(eventsNavLinks);
	}, [setSideBarLinks]);
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
			if (event.trashed) {
				if (!a) m1.set(presentDate, [event]);
				else m1.set(presentDate, [...a, event]);
			}
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
					img={nullTrash}
					text={
						<>
							<h3
								style={{
									fontSize: "3rem",
									lineHeight: "4rem",
									margin: "0 0 1rem 0",
								}}
							>
								Bin is Empty
							</h3>
							<span
								style={{
									fontSize: "2rem",
									lineHeight: "3rem",
								}}
							>
								Items in bin will be deleted forever after 30
								days
							</span>
						</>
					}
				/>
			)}
		</main>
	);
};

export default EventsTrash;
