import styles from "./Container.module.css";

/**
 * Page-level wrapper reproducing the repeated `margin: var(--margin-pages);
 * padding: var(--padding-pages);` pattern used by most top-level pages.
 */
export default function Container({
	as: Component = "main",
	maxWidth,
	className = "",
	...props
}) {
	const widthClass = maxWidth ? styles[`maxWidth${maxWidth}`] || "" : "";
	return (
		<Component className={`${styles.page} ${widthClass} ${className}`.trim()} {...props} />
	);
}
