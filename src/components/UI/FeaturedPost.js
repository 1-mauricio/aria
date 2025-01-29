import React from "react";
import { Link } from "react-router-dom";
import "../styles/featured-post.css";

export default function FeaturedPost({ featuredPost }) {
	if (!featuredPost) return null;

	return (
		<section className="featured-post">
			<Link
				to={`/p/${featuredPost.customLink}`}
				className="featured-post-link"
			>
				<article className="featured-post-item">
					{featuredPost.imageUrl && (
						<div className="featured-post-image">
							<img
								src={featuredPost.imageUrl}
								alt={featuredPost.title}
							/>
						</div>
					)}
					<div className="featured-post-content">
						<h2 className="featured-post-heading">
							Post em Destaque
						</h2>
						<div className="featured-post-category">
							{featuredPost.category}
						</div>
						<h3 className="featured-post-title">
							{featuredPost.title}
						</h3>
						<p className="featured-post-subtitle">
							{featuredPost.subTitle}
						</p>
						<p className="featured-post-meta">
							{featuredPost.date} · {featuredPost.readTime} min
						</p>
					</div>
				</article>
			</Link>
		</section>
	);
}
