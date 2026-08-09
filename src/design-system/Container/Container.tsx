import React from "react";
import styles from "./Container.module.css";

export interface ContainerProps {
	as?: React.ElementType;
	maxWidth?: "680" | "800";
	className?: string;
	children?: React.ReactNode;
	[key: string]: any;
}

/**
 * Page-level wrapper reproducing the repeated `margin: var(--margin-pages);
 * padding: var(--padding-pages);` pattern used by most top-level pages.
 */
export default function Container({
	as: Component = "main",
	maxWidth,
	className = "",
	...props
}: ContainerProps) {
	const widthClass = maxWidth
		? (styles as Record<string, string>)[`maxWidth${maxWidth}`] || ""
		: "";
	return (
		<Component
			className={`${styles.page} ${widthClass} ${className}`.trim()}
			{...props}
		/>
	);
}
