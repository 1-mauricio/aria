import styles from "./Input.module.css";

/** Text input primitive. Matches the bordered form-field style (Subscribe form). */
export default function Input({ className = "", ...props }) {
	return <input className={`${styles.input} ${className}`.trim()} {...props} />;
}
