import styles from "./Card.module.css";

/**
 * Generic surface primitive (background + padding + radius + optional
 * shadow). Covers donate-card, subscribe-form, contact-section,
 * related-posts and similar boxed sections.
 */
export default function Card({
	background = "default",
	padding = "md",
	shadow = "none",
	textCenter = false,
	className = "",
	style,
	...props
}) {
	const classes = [
		styles.base,
		styles[`background-${background}`],
		styles[`padding-${padding}`],
		shadow !== "none" ? styles[`shadow-${shadow}`] : "",
		textCenter ? styles["text-center"] : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <div className={classes} style={style} {...props} />;
}
