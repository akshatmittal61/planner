import React from "react";

const MonthDialogBox = ({ months, handle }) => {
	return (
		<div className="calendar-dialog-month">
			<div className="calendar-dialog-month-cover"></div>
			<ul>
				{months.map((month, index) => (
					<li key={index}>
						<button onClick={() => handle(index)}>{month}</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MonthDialogBox;
