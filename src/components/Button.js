import React from "react";

export function Button({ children, anyFunction }) {
	return (
		<button className="button" onClick={anyFunction}>
			{children}
		</button>
	);
}
