import React from "react";

const DonationSection = ({ width = "50%" }) => {
	return (
		<section className="donation-section" style={{ width: width }}>
			<h2>Apoie este blog</h2>
			<p>
				Se você gostou deste conteúdo e quer ver mais, considere fazer
				uma doação para ajudar a manter este blog.
			</p>
			<a
				href="/doe"
				target="_blank"
				rel="noopener noreferrer"
				className="donate-button"
			>
				Fazer uma doação
			</a>
		</section>
	);
};

export default DonationSection;
