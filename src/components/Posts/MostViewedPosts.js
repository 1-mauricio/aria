import React, { useState } from "react";
import { Link } from "react-router-dom";

const MostViewedPosts = ({ mostViewedWeek, mostViewedMonth }) => {
	const [activeTab, setActiveTab] = useState("week");

	const currentList = activeTab === "week" ? mostViewedWeek : mostViewedMonth;

	return (
		<div className="most-viewed-container">
			<div className="most-viewed-list">
				<div className="tab-navigation">
					<button
						className={`tab-button ${
							activeTab === "week" ? "active" : ""
						}`}
						onClick={() => setActiveTab("week")}
					>
						Semana
					</button>
					<button
						className={`tab-button ${
							activeTab === "month" ? "active" : ""
						}`}
						onClick={() => setActiveTab("month")}
					>
						Mês
					</button>
				</div>

				{currentList.length ? (
					currentList.map((post, index) => (
						<Link
							to={`/p/${post.customLink}`}
							key={post.id}
							className="most-viewed-item"
						>
							<span className="most-viewed-number">
								{index + 1}
							</span>
							<div className="most-viewed-content">
								<h3>{post.title}</h3>
								<span className="most-viewed-date">
									{post.date}
								</span>
							</div>
						</Link>
					))
				) : (
					<p>
						Nenhum post visualizado{" "}
						{activeTab === "week" ? "esta semana" : "este mês"}.
					</p>
				)}
			</div>
		</div>
	);
};
export default MostViewedPosts;
