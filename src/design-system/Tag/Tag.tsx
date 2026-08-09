import React from "react";
import styles from "./Tag.module.css";

export interface TagProps {
	as?: React.ElementType;
	active?: boolean;
	className?: string;
	children?: React.ReactNode;
	[key: string]: any;
}

/** Pill-shaped badge/tag. Matches the topic-tag pattern used on Home. */
export default function Tag({
	as: Component = "span",
	active = false,
	className = "",
	...props
}: TagProps) {
	return (
		<Component
			className={`${styles.pill} ${active ? styles.active : ""} ${className}`.trim()}
			{...props}
		/>
	);
}
