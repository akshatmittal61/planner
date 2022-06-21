import React from "react";

const Row = ({ children }) => <div className="row">{children}</div>;

export default Row;

export const Col = ({ lg = 100, md = 100, sm = 100, children }) => (
	<div className={`col-lg-${lg} col-md-${md} col-sm-${sm}`}>{children}</div>
);
