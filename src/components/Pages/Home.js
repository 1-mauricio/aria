import React, { useEffect, useState } from "react";
import PostItem from "../UI/PostItem";
import ArticleItem from "../UI/ArticleItem";
import DonationSection from "../UI/DonationSection";
import FeaturedPost from "../UI/FeaturedPost";
import MostViewedPosts from "../UI/MostViewedPosts";
import "../styles/home.css";
import CONFIG from "../../CONFIG";
import { useNavigate } from "react-router-dom";

export default function Home({ posts = [], uniqueCategories = [] }) {
	const [loading, setLoading] = useState(true);
	const [mostViewedWeek, setMostViewedWeek] = useState([]);
	const [mostViewedMonth, setMostViewedMonth] = useState([]);
	const [mostViewedAllTime, setMostViewedAllTime] = useState([]);
	const [featuredPost, setfeaturedPost] = useState(null);
	const [articlePosts, setArticlePosts] = useState([]);
	const [latestPosts, setlatestPosts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedTopics, setSelectedTopics] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		setCategories(uniqueCategories);
	}, [uniqueCategories]);

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

			if (CONFIG.articles) {
				const articlePostsIds = CONFIG.articles;
				const articlePosts = posts.filter((post) =>
					articlePostsIds.includes(post.id)
				);

				if (articlePosts.length > 0) {
					setArticlePosts(articlePosts);
				} else {
					setArticlePosts([]);
				}
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

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			navigate(
				`/search?searchTerm=${encodeURIComponent(searchTerm.trim())}`
			);
		}
	};

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
			</div>
		);
	}

	return (
		<main className="home-container">
		  <section className="search-section-home">
			<form className="search-bar-home" onSubmit={handleSearchSubmit}>
			  <input
				type="text"
				placeholder="Pesquisar..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			  />
			</form>
	  
			<div className="topics-section">
			  <span>Tópicos:</span>
			  <div className="topics-list">
				{categories.map((topic) => (
				  <a
					key={topic}
					className={`topic-tag ${selectedTopics.includes(topic) ? "active" : ""}`}
					href={"/posts/" + topic}
				  >
					{topic}
				  </a>
				))}
			  </div>
			</div>
		  </section>
	  
		  <div className="featured-content">
			<FeaturedPost featuredPost={featuredPost} />
			
			<section className="featured-articles">
			  <div className="posts-list">
				{articlePosts.map((post) => (
				  <ArticleItem
					key={post.id}
					post={post}
				  />
				))}
			  </div>
			</section>
		  </div>
	  
		  <div className="content-grid">
			<div className="main-content">
			  <section className="latest-posts">
				<h2>Últimos Posts</h2>
				<div className="posts-list">
				  {latestPosts.map((post) => (
					<PostItem key={post.id} post={post} />
				  ))}
				</div>
			  </section>
			</div>
	  
			<aside className="sidebar">
			  <DonationSection width="100%" />
			  <MostViewedPosts
				mostViewedWeek={mostViewedWeek}
				mostViewedMonth={mostViewedMonth}
			  />
			</aside>
		  </div>
		</main>
	  );
	}	  