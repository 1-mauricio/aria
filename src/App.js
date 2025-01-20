import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./components/Pages/Home";
import Archive from "./components/Pages/Archive";
import PostDetail from "./components/Posts/PostDetail";
import About from "./components/Pages/About";
import Footer from "./components/Layout/Footer";
import Subscribe from "./components/Pages/Subscribe";
import Donate from "./components/Pages/Donate";
import NotFound from "./components/Pages/NotFound";
import Search from "./components/Pages/Search";

import { fetchPosts } from "./services/PostService";
import CONFIG from "./CONFIG";
import { Helmet } from "react-helmet";
import { onCLS, onFCP, onFID, onLCP, onTTFB } from "web-vitals";

export default function App() {
	const [posts, setPosts] = useState(() => {
		const cached = localStorage.getItem("cached_posts");
		return cached ? JSON.parse(cached) : [];
	});
	const [loading, setLoading] = useState(
		!localStorage.getItem("cached_posts")
	);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadPosts = async () => {
			try {
				const cachedTimestamp = localStorage.getItem("posts_timestamp");
				const isExpired =
					!cachedTimestamp ||
					Date.now() - parseInt(cachedTimestamp) > 30 * 60 * 1000;

				if (isExpired) {
					setLoading(true);
					const data = await fetchPosts();
					setPosts(data);
					localStorage.setItem("cached_posts", JSON.stringify(data));
					localStorage.setItem(
						"posts_timestamp",
						Date.now().toString()
					);
				}
			} catch (err) {
				setError("Erro ao carregar posts.");
			} finally {
				setLoading(false);
			}
		};
		loadPosts();
	}, []);

	/*
	useEffect(() => {
		onCLS((metric) => {
			console.log("Cumulative Layout Shift:", metric);
		});
		onFCP((metric) => {
			console.log("First Contentful Paint:", metric);
		});
		onFID((metric) => {
			console.log("First Input Delay:", metric);
		});
		onLCP((metric) => {
			console.log("Largest Contentful Paint:", metric);
		});
		onTTFB((metric) => {
			console.log("Time to First Byte:", metric);
		});
	}, []);
	*/

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
			</div>
		);
	}

	if (error) {
		return <div className="error-message">{error}</div>;
	}

	return (
		<BrowserRouter>
		 <Helmet>
        <title>{CONFIG.seo.title}</title>
        <meta name="description" content={CONFIG.seo.description} />
        <meta name="author" content={CONFIG.siteName} />
        <meta name="keywords" content={CONFIG.seo.keywords} />
        <meta property="og:title" content={CONFIG.seo.title} />
        <meta property="og:description" content={CONFIG.seo.description} />
        <meta property="og:url" content={CONFIG.seo.url} />
        <meta property="og:image" content={CONFIG.seo.image} />
        <meta property="og:type" content="website" />
      </Helmet>
			<Header />
			<Routes>
				<Route path="/" element={<Home posts={posts} />} />
				<Route path="/posts" element={<Archive data={posts} />} />
				<Route
					path="/posts/:category"
					element={<Archive data={posts} />}
				/>
				<Route path="p/:id" element={<PostDetail posts={posts} />} />
				<Route
					path="p/:titulo"
					element={<PostDetail posts={posts} />}
				/>
				<Route path="/sobre" element={<About />} />
				<Route path="/inscreva-se" element={<Subscribe />} />
				<Route path="/doe" element={<Donate />} />
				<Route path="/search" element={<Search data={posts} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
