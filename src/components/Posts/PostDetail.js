import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	fetchPostByCustomLink,
	fetchPostById,
	fetchPosts,
} from "../../services/PostService";
import NotFound from "../Pages/NotFound";
import DonationSection from "../Pages/DonationSection";

export default function PostDetail() {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [recentPosts, setRecentPosts] = useState([]);

	useEffect(() => {
		setLoading(true);
		setError(false);

		const fetchPost = async () => {
			try {
				let data;
				const param = parseInt(id);
				if (!isNaN(param)) {
					data = await fetchPostById(id);
				} else {
					data = await fetchPostByCustomLink(id);
				}
				if (data) {
					setPost(data);
				} else {
					setError(true);
				}

				fetchPosts()
					.then((recent) => {
						setRecentPosts(recent.slice(0, 3));
					})
					.catch((error) => {
						console.error("Erro ao carregar posts:", error);
					});
					
			} catch (error) {
				console.error("Erro ao carregar post:", error);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [id]);

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
					<span className="post-category">{post.category}</span>
					<span className="post-date">{post.date}</span>
					<span className="post-read-time">{post.readTime} min</span>
				</div>
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
