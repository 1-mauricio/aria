import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import CONFIG from "../CONFIG";
import { Button } from "../design-system";

document.title = CONFIG.siteName;

export default function NotFound() {
	return (
		<main className="not-found-container">
			<div className="not-found-content">
				<h1>404</h1>
				<h2>Página não encontrada</h2>
				<p>Desculpe, a página que você está procurando não existe.</p>
				<Button as={Link} variant="pill" to="/">
					Voltar para Home
				</Button>
			</div>
		</main>
	);
}
