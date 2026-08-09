import React from "react";
import styles from "./Spinner.module.css";

/** Full-page loading spinner. Matches the loading state used across pages. */
export default function Spinner() {
	return (
		<div className={styles.container}>
			<div className={styles.spinner}></div>
		</div>
	);
}
