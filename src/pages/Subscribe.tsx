import React, { useState } from "react";
import "./Subscribe.css";
import CONFIG from "../CONFIG";
import { Card, Button, Input, Heading, Text } from "../design-system";

interface SubscribeFormData {
	name: string;
	email: string;
	interests: string[];
}

export default function Subscribe() {
	document.title = "Inscreva-se - " + CONFIG.siteName;

	const [formData, setFormData] = useState<SubscribeFormData>({
		name: "",
		email: "",
		interests: [],
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<main className="subscribe-container">
			<section className="subscribe-header">
				<Heading level={1}>Inscreva-se no Imprensa Malakoff</Heading>
				<Text color="light">
					Receba as últimas notícias e artigos diretamente na sua
					caixa de entrada.
				</Text>
			</section>

			<section className="subscribe-form">
				<Card padding="md">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="name">Nome</label>
							<Input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="form-group">
							<label htmlFor="email">E-mail</label>
							<Input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<Button type="submit" variant="block">
							Inscrever-se
						</Button>
					</form>
				</Card>
			</section>
		</main>
	);
}
