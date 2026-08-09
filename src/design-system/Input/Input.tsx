import React from "react";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

/** Text input primitive. Matches the bordered form-field style (Subscribe form). */
export default function Input({ className = "", ...props }: InputProps) {
	return <input className={`${styles.input} ${className}`.trim()} {...props} />;
}
