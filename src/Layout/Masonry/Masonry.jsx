import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Context/GlobalContext";
import "./masonry.css";

const Masonry = ({ lg = 3, md = 2, sm = 1, children }) => {
	const { breakpoint } = useContext(GlobalContext);
	const [countOfColumns, setCountOfColumns] = useState(
		breakpoint("mobile") ? sm : breakpoint("tab") ? md : lg
	);
	useEffect(() => {
		window.addEventListener("change", () => {
			if (breakpoint("mobile")) setCountOfColumns(sm);
			else if (breakpoint("tab")) setCountOfColumns(md);
			else setCountOfColumns(lg);
		});
	}, [breakpoint, lg, md, sm]);
	return (
		<div
			className="masonry"
			style={{
				columnCount: countOfColumns,
			}}
		>
			{children}
		</div>
	);
};

const MasonryBox = ({ children }) => (
	<div className="masonry-box">{children}</div>
);

export default Masonry;
export { MasonryBox };
