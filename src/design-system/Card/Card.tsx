import React from "react";
import styles from "./Card.module.css";

export interface CardProps {
	background?: "default" | "light";
	padding?: "sm" | "md" | "lg";
	shadow?: "none" | "md" | "lg";
	textCenter?: boolean;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
	[key: string]: any;
}

const styleMap = styles as Record<string, string>;

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
}: CardProps) {
	const classes = [
		styles.base,
		styleMap[`background-${background}`],
		styleMap[`padding-${padding}`],
		shadow !== "none" ? styleMap[`shadow-${shadow}`] : "",
		textCenter ? styleMap["text-center"] : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <div className={classes} style={style} {...props} />;
}
