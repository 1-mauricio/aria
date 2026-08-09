import styles from "./Typography.module.css";

/**
 * Heading levels 1-4. `variant` selects a named size treatment; today only
 * "pageTitle" is defined (the h1 shared by the donate/subscribe/about page
 * headers). Component-specific headings (article titles, featured post
 * title, etc.) keep their own component CSS, tokenized.
 */
export function Heading({ level = 2, variant = "pageTitle", className = "", ...props }) {
	const Tag = `h${level}`;
	const variantClass = styles[variant] || "";
	return <Tag className={`${variantClass} ${className}`.trim()} {...props} />;
}

/** Body text. `color` maps to the text color scale (default/light/lighter). */
export function Text({
	as: Component = "p",
	variant = "text",
	color = "default",
	className = "",
	...props
}) {
	const variantClass = styles[variant] || "";
	const colorClass = styles[`color-${color}`] || "";
	return (
		<Component className={`${variantClass} ${colorClass} ${className}`.trim()} {...props} />
	);
}
