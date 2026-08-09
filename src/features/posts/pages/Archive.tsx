import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { useParams, useNavigate } from "react-router-dom";
import "./Archive.css";
import CONFIG from "../../../CONFIG";
import { usePosts } from "../hooks/usePosts";
import { useCategories } from "../hooks/useCategories";
import { Container, Spinner } from "../../../design-system";

export default function Archive() {
	const { category: routeCategory } = useParams();
	const { data: posts = [], isLoading: postsLoading } = usePosts();
	const categories = useCategories();
	const [selectedCategory, setSelectedCategory] = useState(
		routeCategory?.toLowerCase() || "all"
	);
	const [filteredPosts, setFilteredPosts] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Arquivo - " + CONFIG.siteName;
	}, []);

	useEffect(() => {
		const updatedPosts =
			selectedCategory === "all"
				? posts
				: posts.filter(
						(post) =>
							post.category &&
							post.category.toLowerCase() === selectedCategory
				  );

		setFilteredPosts(updatedPosts);
	}, [posts, selectedCategory]);

	useEffect(() => {
		if (routeCategory) {
			setSelectedCategory(routeCategory.toLowerCase());
		}
	}, [routeCategory]);

	const handleCategoryChange = (category) => {
		setSelectedCategory(category.toLowerCase());
		if (category === "all") {
			navigate(`/posts`);
			return;
		}
		navigate(`/posts/${category.toLowerCase()}`);
	};

	if (postsLoading) {
		return <Spinner />;
	}

	return (
		<Container className="archive-container">
			<div className="archive-header">
				<h1>Arquivo</h1>
				<div className="category-filter">
					<div className="tab-navigation">
						<button
							className={`tab-button ${
								selectedCategory === "all" ? "active" : ""
							}`}
							onClick={() => handleCategoryChange("all")}
						>
							todos
						</button>
						{categories.map((category) => (
							<button
								key={category}
								className={`tab-button ${
									selectedCategory === category
										? "active"
										: ""
								}`}
								onClick={() =>
									handleCategoryChange(category)
								}
							>
								{category}
							</button>
						))}
					</div>
				</div>
			</div>
			<div className="filtered-posts">
				<PostList key={selectedCategory} postsList={filteredPosts} />
			</div>
		</Container>
	);
}
