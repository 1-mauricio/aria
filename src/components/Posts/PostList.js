import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { fetchPosts } from "../../services/PostService";

export default function PostList({ postsList = [] }) {
	const [posts, setPosts] = useState(postsList); // Usa postsList como valor inicial

	useEffect(() => {
		if (postsList.length === 0) {
			// Só faz o fetch se postsList estiver vazio
			fetchPosts()
				.then(setPosts)
				.catch((error) =>
					console.error("Erro ao carregar posts:", error)
				);
		}
	}, [postsList]); // Dependência de postsList

	return (
		<div className="posts-list">
			{posts.length > 0 ? (
				posts.map((post) => <PostItem key={post.id} post={post} />)
			) : (
				<p>Nenhum post encontrado.</p> // Caso não haja posts
			)}
		</div>
	);
}
