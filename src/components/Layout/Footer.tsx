import React from "react";
import "../styles/footer.css";
import CONFIG from "../../CONFIG";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="footer-links">
					<a href="/sobre">Sobre</a>
					<a href="/posts">Posts</a>
					<a href="/inscreva-se">Newsletter</a>
				</div>
				<div className="footer-social">
					{Object.entries(CONFIG.socialMedia).map(([key, url]) => (
						<a
							key={key}
							href={url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{key.charAt(0).toUpperCase() + key.slice(1)}
						</a>
					))}
				</div>
				<div className="footer-text">
					© 2025. {CONFIG.siteName}. Todos os direitos reservados.
				</div>
			</div>
		</footer>
	);
}
