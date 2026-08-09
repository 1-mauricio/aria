import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../../../pages/NotFound";
import DonationSection from "../../../features/donations/components/DonationSection";
import PostInteractions from "../components/PostInteractions";
import "./PostDetail.css";
import { usePosts } from "../hooks/usePosts";
import { postsRepository } from "../api/postsRepository";
import { Container } from "../../../design-system";

export default function PostDetail() {
	const { id } = useParams();
	const { data: posts = [], isLoading: postsLoading } = usePosts();

	const post =
		posts.find((post) => post.customLink === id) ||
		posts.find((post) => post.id === parseInt(id ?? "", 10));

	useEffect(() => {
		if (!post) return;

		document.title = `${post.title} - A Ária`;
		window.scrollTo(0, 0);

		postsRepository
			.fetchPostById(post.id, { updateViewsCount: true })
			.catch(() => console.error("Erro ao atualizar as views."));
	}, [post]);

	if (postsLoading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
			</div>
		);
	}

	if (!post) {
		return <NotFound />;
	}

	const recentPosts = posts.filter((p) => p.id !== post.id).slice(0, 3);

	return (
		<Container as="article" maxWidth="800" className="post-detail">
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

				<PostInteractions post={post} />
			</header>

			<div
				className="post-content"
				dangerouslySetInnerHTML={{ __html: post.content }}
			></div>

			<DonationSection width="60%" />

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
		</Container>
	);
}
