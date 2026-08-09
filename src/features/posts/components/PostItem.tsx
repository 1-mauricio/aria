import React from "react";
import { Link } from "react-router-dom";
import "./PostItem.css";
import { Post } from "../types";

interface PostItemProps {
	post: Post;
}

export default function PostItem({ post }: PostItemProps) {
	return (
		<Link to={`/p/${post.customLink || post.id}`} className="post-item-link">
			<article className="post-item">
			{post.imageUrl && (
					<div className="post-item-image">
						<img src={post.imageUrl} alt={post.title} />
					</div>
				)}
				<div className="post-item-content">
					<div className="post-category">{post.category}</div>
					<h2>{post.title}</h2>
					<p>
						{post.date} · {post.time} · {post.readTime} min
					</p>
				</div>
			</article>
		</Link>
	);
}
