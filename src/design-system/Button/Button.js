import styles from "./Button.module.css";

/**
 * CTA button primitive. Covers the "filled brown button" pattern repeated
 * across the app (donate/subscribe CTAs, donation links, 404/home button).
 * `as` accepts "button", "a", or a component (e.g. react-router's Link).
 */
export default function Button({
	as: Component = "button",
	variant = "block",
	className = "",
	...props
}) {
	const variantClass = styles[variant] || styles.block;
	return (
		<Component
			className={`${styles.base} ${variantClass} ${className}`.trim()}
			{...props}
		/>
	);
}
