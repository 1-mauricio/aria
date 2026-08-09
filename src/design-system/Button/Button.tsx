import React from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "block" | "link" | "pill" | "compact";

export interface ButtonProps {
	as?: React.ElementType;
	variant?: ButtonVariant;
	className?: string;
	children?: React.ReactNode;
	[key: string]: any;
}

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
}: ButtonProps) {
	const variantClass = (styles as Record<string, string>)[variant] || styles.block;
	return (
		<Component
			className={`${styles.base} ${variantClass} ${className}`.trim()}
			{...props}
		/>
	);
}
