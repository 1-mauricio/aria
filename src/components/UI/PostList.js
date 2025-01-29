import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { fetchPosts } from "../../services/PostService";
import "../styles/post-list.css";

export default function PostList({ postsList = [] }) {
	const [posts, setPosts] = useState(postsList);

	useEffect(() => {
		if (postsList.length === 0) {
			fetchPosts()
				.then(setPosts)
				.catch((error) =>
					console.error("Erro ao carregar posts:", error)
				);
		}
	}, [postsList]);

	return (
		<div className="posts-list">
			{posts.length > 0 ? (
				posts.map((post) => <PostItem key={post.id} post={post} />)
			) : (
				<p>Nenhum post encontrado.</p>
			)}
		</div>
	);
}
