import React from "react";
import { Button } from "../../../design-system";
import "./DonationSection.css";

const DonationSection = ({ width = "50%" }) => {
	return (
		<section className="donation-section" style={{ width }}>
			<h2>Apoie este blog</h2>
			<p>
				Se você gostou deste conteúdo e quer ver mais, considere fazer
				uma doação para ajudar a manter este blog.
			</p>
			<Button as="a" variant="link" href="/doe" target="_blank" rel="noopener noreferrer">
				Fazer uma doação
			</Button>
		</section>
	);
};

export default DonationSection;
