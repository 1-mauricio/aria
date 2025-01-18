import React, { useEffect, useState } from "react";
import PostList from "../Posts/PostList";
import { fetchPosts } from "../../services/PostService";
import { useParams } from "react-router-dom";

export default function Archive() {
	const { category: routeCategory } = useParams();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(routeCategory?.toLowerCase() || "all");
	const [filteredPosts, setFilteredPosts] = useState([]);

	// Carregar posts e categorias ao montar o componente
	useEffect(() => {
		setLoading(true);
		fetchPosts()
			.then((data) => {
				setPosts(data);

				// Extrair categorias únicas (ignorar case)
				const uniqueCategories = [
					...new Set(data.map((post) => post.category?.toLowerCase())),
				].filter(Boolean);

				setCategories(uniqueCategories);
				setFilteredPosts(
					data.filter((post) =>
						selectedCategory === "all"
							? true
							: post.category?.toLowerCase() === selectedCategory
					)
				);
			})
			.catch((error) => {
				console.error("Erro ao carregar posts:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [selectedCategory]);

	// Atualizar a categoria selecionada
	const handleCategoryChange = (category) => {
		setSelectedCategory(category.toLowerCase());
	};

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
			</div>
		);
	}

	if (!Array.isArray(posts) || posts.length === 0) {
		return <p>Nenhum post encontrado.</p>;
	}

	return (
		<main className="archive-container">
			<div className="archive-header">
				<h1>Posts</h1>
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
								onClick={() => handleCategoryChange(category)}
							>
								{category}
							</button>
						))}
					</div>
				</div>
			</div>
			<PostList postsList={filteredPosts} />
		</main>
	);
}
