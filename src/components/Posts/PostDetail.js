import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	fetchPostById,
} from "../../services/PostService";
import NotFound from "../Pages/NotFound";
import DonationSection from "../Pages/DonationSection";
import PostInteractions from "../Pages/PostInteractions";
import "../styles/post-detail.css";

export default function PostDetail({ posts = [] }) {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [viewsUpdated, setViewsUpdated] = useState(false);
	const [recentPosts, setRecentPosts] = useState([]);

	useEffect(() => {
		setLoading(true);
		setError(false);

		const findPost =
			posts.find((post) => post.customLink === id) ||
			posts.find((post) => post.id === parseInt(id));

		if (findPost) {
			document.title = `${findPost.title} - A Ária`;
			setPost(findPost);
			setLoading(false);

			console.log(viewsUpdated)

			if (!viewsUpdated) {
				console.log("entrou")
				fetchPostById(findPost.id)
					.then(() => {
						setViewsUpdated(true);
			console.log(viewsUpdated)

					})
					.catch(() => {
						console.error("Erro ao atualizar as views.");
					});
			}

			const recents = posts.filter((post) => post.id !== findPost.id);
			setRecentPosts(recents.slice(0, 3));

			return;
		}
	}, []);

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
			</div>
		);
	}

	if (error || !post) {
		return <NotFound />;
	}

	return (
		<article className="post-detail">
			<header className="post-header">
				<h1 className="post-title">{post.title}</h1>
				<em>
					<p className="post-subtitle">{post.subTitle}</p>
				</em>
				<div className="post-meta">
					<a
						href={"/posts/" + post.category}
						className="post-category"
					>
						{post.category}
					</a>
					<span className="post-date">{post.date}</span>
					<span className="post-read-time">{post.readTime} min</span>
				</div>

				<PostInteractions
					post={post}
				/>

				{post.imageUrl && (
					<div className="post-image-container">
						<div className="post-image-wrapper">
							<img
								src={post.imageUrl}
								alt={post.title}
								className="post-image"
							/>
						</div>
					</div>
				)}
			</header>

			<DonationSection width="60%" />

			<div
				className="post-content"
				dangerouslySetInnerHTML={{ __html: post.content }}
			></div>

			{recentPosts.length > 0 && (
				<section className="related-posts">
					<h2>Veja também nossos últimos posts</h2>
					<ul>
						{recentPosts.map((recentPost) => (
							<li key={recentPost.id}>
								<Link to={`/p/${recentPost.customLink}`}>
									{recentPost.title}
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}			
		</article>
	);
}
