import React, { useEffect, useState } from "react";
import "./Donate.css";
import CONFIG from "../../../CONFIG";
import { Card, Button, Container, Heading, Text } from "../../../design-system";

export default function Donate() {
	const [copied, setCopied] = useState(false);
	const chavePix = CONFIG.pix;

	const copyToClipboard = () => {

		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard
				.writeText(chavePix)
				.then(() => feedbackCopiado())
				.catch((err) => console.error("Erro ao copiar:", err));
		} else {
			const textArea = document.createElement("textarea");
			textArea.value = chavePix;
			textArea.style.position = "absolute";
			textArea.style.left = "-9999px";
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
			feedbackCopiado();
		}
	};

	const feedbackCopiado = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	useEffect(() => {
		document.title = "Apoie - " + CONFIG.siteName;
	}, []);

	return (
		<Container maxWidth="680" className="donate-container">
			<section className="donate-header">
				<Heading level={1}>Apoie {CONFIG.siteName}</Heading>
				<Text>Ajude-nos a manter o conteúdo gratuito e de qualidade.</Text>
			</section>

			<section className="donate-options">
				<Card padding="md" textCenter>
					<h2>PIX</h2>
					<p>Chave: {chavePix}</p>
					<Button variant="block" onClick={copyToClipboard}>
						{copied ? "Copiado!" : "Copiar Chave"}
					</Button>
				</Card>
			</section>
		</Container>
	);
}
