import React from "react";
import PostItem from "./PostItem";
import "./PostList.css";
import { Post } from "../types";

interface PostListProps {
	postsList?: Post[];
}

export default function PostList({ postsList = [] }: PostListProps) {
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
