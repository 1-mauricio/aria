import styles from "./Tag.module.css";

/** Pill-shaped badge/tag. Matches the topic-tag pattern used on Home. */
export default function Tag({ as: Component = "span", active = false, className = "", ...props }) {
	return (
		<Component
			className={`${styles.pill} ${active ? styles.active : ""} ${className}`.trim()}
			{...props}
		/>
	);
}
