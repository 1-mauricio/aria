import React from "react";
import styles from "./Typography.module.css";

const styleMap = styles as Record<string, string>;

export interface HeadingProps {
	level?: 1 | 2 | 3 | 4;
	variant?: "pageTitle";
	className?: string;
	children?: React.ReactNode;
	[key: string]: any;
}

/**
 * Heading levels 1-4. `variant` selects a named size treatment; today only
 * "pageTitle" is defined (the h1 shared by the donate/subscribe/about page
 * headers). Component-specific headings (article titles, featured post
 * title, etc.) keep their own component CSS, tokenized.
 */
export function Heading({
	level = 2,
	variant = "pageTitle",
	className = "",
	...props
}: HeadingProps) {
	const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
	const variantClass = styleMap[variant] || "";
	return <HeadingTag className={`${variantClass} ${className}`.trim()} {...props} />;
}

export interface TextProps {
	as?: React.ElementType;
	variant?: "text";
	color?: "default" | "light" | "lighter";
	className?: string;
	children?: React.ReactNode;
	[key: string]: any;
}

/** Body text. `color` maps to the text color scale (default/light/lighter). */
export function Text({
	as: Component = "p",
	variant = "text",
	color = "default",
	className = "",
	...props
}: TextProps) {
	const variantClass = styleMap[variant] || "";
	const colorClass = styleMap[`color-${color}`] || "";
	return (
		<Component
			className={`${variantClass} ${colorClass} ${className}`.trim()}
			{...props}
		/>
	);
}
