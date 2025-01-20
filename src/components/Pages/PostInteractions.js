import { useState, useEffect } from "react";
import "../styles/post-interactions.css";
import { likePost, unlikePost } from "../../services/PostService";

const PostInteractions = ({ post }) => {
	const [liked, setLiked] = useState(false);
	const [postLikes, setPostLikes] = useState(post.likes)

	useEffect(() => {
		const storedLiked = localStorage.getItem(`liked_${post.id}`);
		if (storedLiked === "true") {
			setLiked(true);
		}
	}, [post.id]);

	const handleLike = async () => {
		const newLiked = !liked;
		setLiked(newLiked);

		if (newLiked) {
			likePost(post); 
			setPostLikes(postLikes + 1);
		} else {
			unlikePost(post);
			setPostLikes(postLikes - 1);
		}

		localStorage.setItem(`liked_${post.id}`, newLiked.toString());

	};

	const handleShare = async () => {
		try {
			await navigator.share({
				title: post.title,
				url: `${window.location.origin}/p/${post.customLink}`,
			});
		} catch (error) {
			console.error("Erro ao compartilhar:", error);
		}
	};

	return (
		<div className="post-interactions">
			<div className="tab-navigation">
				<button
					className={`tab-button ${liked ? "active" : ""}`}
					onClick={handleLike}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill={liked ? "currentColor" : "none"}
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
					</svg>
					Curtir ({postLikes})
				</button>
				<button className="tab-button" onClick={handleShare}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
						<polyline points="16 6 12 2 8 6"></polyline>
						<line x1="12" y1="2" x2="12" y2="15"></line>
					</svg>
					Compartilhar
				</button>
			</div>
		</div>
	);
};

export default PostInteractions;
