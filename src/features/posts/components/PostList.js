import React from "react";
import PostItem from "./PostItem";
import "./PostList.css";

export default function PostList({ postsList = [] }) {
	return (
		<div className="posts-list">
			{postsList.length > 0 ? (
				postsList.map((post) => <PostItem key={post.id} post={post} />)
			) : (
				<p>Nenhum post encontrado.</p>
			)}
		</div>
	);
}
