import React, { useEffect, useState } from "react";
import PostItem from "../Posts/PostItem";
import DonationSection from "./DonationSection";
import FeaturedPost from "../Posts/FeaturedPost";
import MostViewedPosts from "../Posts/MostViewedPosts";
import "../styles/home.css";
import CONFIG from "../../CONFIG";

export default function Home({ posts = [] }) {
	const [loading, setLoading] = useState(true);
	const [mostViewedWeek, setMostViewedWeek] = useState([]);
	const [mostViewedMonth, setMostViewedMonth] = useState([]);
	const [mostViewedAllTime, setMostViewedAllTime] = useState([]);
	const [featuredPost, setfeaturedPost] = useState(null);
	const [latestPosts, setlatestPosts] = useState([]);

	useEffect(() => {
		setLoading(true);
		document.title = "Home - " + CONFIG.siteName;

		if (posts.length > 0) {
			const featuredId = CONFIG.featuredPost;

			const featuredPost = posts.find((post) => post.id === featuredId);

			if (featuredPost) {
				setfeaturedPost(featuredPost);
			} else {
				setfeaturedPost(posts.length > 0 ? posts[0] : null);
			}

			setlatestPosts(posts);

			const sortedWeek = posts
				.sort((a, b) => b.viewsThisWeek - a.viewsThisWeek)
				.slice(0, 3);
			setMostViewedWeek(sortedWeek);

			const sortedMonth = posts
				.sort((a, b) => b.viewsThisMonth - a.viewsThisMonth)
				.slice(0, 3);
			setMostViewedMonth(sortedMonth);

			const sortedAllTime = posts
				.sort((a, b) => b.viewsThisMonth - a.viewsThisMonth)
				.slice(0, 3);
			setMostViewedAllTime(sortedAllTime);

			setLoading(false);
		}
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
						
					<div className="hero-logo">
						<h1>a ári</h1>
						<img className="logo-img" src="/assets/logo-crop.gif" />
						</div>
					<p>{CONFIG.siteDescription}</p>
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
