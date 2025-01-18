import React, { useEffect, useState } from "react";
import PostItem from "../Posts/PostItem";
import { fetchPosts } from "../../services/PostService";
import DonationSection from "./DonationSection";
import FeaturedPost from "../Posts/FeaturedPost";
import MostViewedPosts from "../Posts/MostViewedPosts";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [mostViewedWeek, setMostViewedWeek] = useState([]);
	const [mostViewedMonth, setMostViewedMonth] = useState([]);
	const [mostViewedAllTime, setMostViewedAllTime] = useState([]);
	const [featuredPost, setfeaturedPost] = useState(null);
	const [latestPosts, setlatestPosts] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetchPosts()
			.then((data) => {
				setfeaturedPost(data.length > 0 ? data[0] : null);

				setlatestPosts(data);

				const sortedWeek = data
					.sort((a, b) => b.viewsThisWeek - a.viewsThisWeek)
					.slice(0, 3);
				setMostViewedWeek(sortedWeek);

				const sortedMonth = data
					.sort((a, b) => b.viewsThisMonth - a.viewsThisMonth)
					.slice(0, 3);
				setMostViewedMonth(sortedMonth);

				const sortedAllTime = data
					.sort((a, b) => b.viewsThisMonth - a.viewsThisMonth)
					.slice(0, 3);
				setMostViewedAllTime(sortedAllTime);

				setLoading(false);
			})
			.catch((error) => {
				console.error("Erro ao carregar posts:", error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
			</div>
		);
	}

	return (
		<main className="home-container">
			{/* Hero Section */}
			<section className="hero-section">
				<div className="hero-text">
					<h1>A ÁRIA</h1>
					<p>
						Fique por dentro das últimas notícias e tendências sobre
						design, tecnologia e ética na web.
					</p>
					{/* <Link to="/posts" className="cta-btn">Explorar Todos os Posts</Link> */}
				</div>
			</section>

			{/* Featured Post */}
			<FeaturedPost featuredPost={featuredPost} />

			{/* Most Viewed Posts */}
			<h2>Posts Mais Vistos</h2>
			<MostViewedPosts
				mostViewedWeek={mostViewedWeek}
				mostViewedMonth={mostViewedMonth}
			/>

			{/* Latest Posts */}
			<section className="latest-posts">
				<h2>Últimos Posts</h2>
				<div className="posts-list">
					{latestPosts.slice(0, 3).map((post) => (
						<PostItem key={post.id} post={post} />
					))}
				</div>
			</section>

			<DonationSection width="40%" />
		</main>
	);
}
