import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import ArticleItem from "../components/ArticleItem";
import DonationSection from "../../../features/donations/components/DonationSection";
import FeaturedPost from "../components/FeaturedPost";
import MostViewedPosts from "../components/MostViewedPosts";
import "./Home.css";
import CONFIG from "../../../CONFIG";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { useCategories } from "../hooks/useCategories";
import { Tag, Spinner } from "../../../design-system";

export default function Home() {
	const { data: posts = [], isLoading: postsLoading } = usePosts();
	const categories = useCategories();

	const [mostViewedWeek, setMostViewedWeek] = useState([]);
	const [mostViewedMonth, setMostViewedMonth] = useState([]);
	const [featuredPost, setFeaturedPost] = useState(null);
	const [articlePosts, setArticlePosts] = useState([]);
	const [latestPosts, setLatestPosts] = useState([]);
	const [selectedTopics] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Home - " + CONFIG.siteName;

		if (posts.length > 0) {
			const featuredId = CONFIG.featuredPost;
			const found = posts.find((post) => post.id === featuredId);
			setFeaturedPost(found || posts[0]);

			if (CONFIG.articles) {
				const articlePostsIds = CONFIG.articles;
				const foundArticles = posts.filter((post) =>
					articlePostsIds.includes(post.id)
				);
				setArticlePosts(foundArticles);
			}

			setLatestPosts(posts);
			setMostViewedWeek(
				[...posts].sort((a, b) => b.viewsThisWeek - a.viewsThisWeek).slice(0, 3)
			);
			setMostViewedMonth(
				[...posts].sort((a, b) => b.viewsThisMonth - a.viewsThisMonth).slice(0, 3)
			);
		}
	}, [posts]);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			navigate(
				`/search?searchTerm=${encodeURIComponent(searchTerm.trim())}`
			);
		}
	};

	if (postsLoading) {
		return <Spinner />;
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
				  <Tag
					as="a"
					key={topic}
					active={selectedTopics.includes(topic)}
					href={"/posts/" + topic}
				  >
					{topic}
				  </Tag>
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
					variant="small"
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
