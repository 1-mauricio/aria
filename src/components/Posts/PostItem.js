import React from "react";
import { Link } from "react-router-dom";
import "../styles/post-item.css";

export default function PostItem({ post }) {
	return (
		<Link to={`/p/${post.customLink}`} className="post-item-link">
			<article className="post-item">
				<div className="post-item-content">
					<div className="post-category">{post.category}</div>
					<h2>{post.title}</h2>
					<p>{post.subTitle}</p>
					<p>
						{post.date} · {post.readTime} min
					</p>
				</div>
				{post.imageUrl && (
					<div className="post-item-image">
						<img src={post.imageUrl} alt={post.title} />
					</div>
				)}
			</article>
		</Link>
	);
}
