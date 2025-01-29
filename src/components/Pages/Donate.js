import React, { useEffect, useState } from "react";
import "../styles/donate.css";
import CONFIG from "../../CONFIG";

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
		<main className="donate-container">
			<section className="donate-header">
				<h1>Apoie {CONFIG.siteName}</h1>
				<p>Ajude-nos a manter o conteúdo gratuito e de qualidade.</p>
			</section>

			<section className="donate-options">
				<div className="donate-card">
					<h2>PIX</h2>
					<p>Chave: {chavePix}</p>
					<button className="donate-button" onClick={copyToClipboard}>
						{copied ? "Copiado!" : "Copiar Chave"}
					</button>
				</div>

				{/*
        <div className="donate-card">
          <h2>Assinatura Mensal</h2>
          <p>A partir de R$9,90/mês</p>
          <button className="donate-button">Assinar</button>
        </div>
        */}

				{/*
        <div className="donate-card">
          <h2>Contribuição Única</h2>
          <p>Escolha o valor</p>
          <button className="donate-button">Contribuir</button>
        </div>
        */}
			</section>
		</main>
	);
}
