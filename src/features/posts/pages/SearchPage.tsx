import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PostList from "../components/PostList";
import "../../../pages/NotFound.css";
import CONFIG from "../../../CONFIG";
import { usePosts } from "../hooks/usePosts";
import { searchPosts } from "../utils/searchPosts";
import { Container, Spinner, Button } from "../../../design-system";

export default function Search() {
	const location = useLocation();
	const { data: posts = [], isLoading: postsLoading } = usePosts();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState(null);
	const [results, setResults] = useState([]);

	useEffect(() => {
		document.title = "Pesquisa - " + CONFIG.siteName;
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const searchTerm = queryParams.get("searchTerm");

		if (searchTerm) {
			setLoading(true);
			setError(null);
			setSearch(searchTerm);

			const result = searchPosts(searchTerm, posts);

			if (result.length > 0) {
				setResults(result);
				setLoading(false);
			} else {
				setError("Erro ao buscar posts");
				setLoading(false);
			}
		}
	}, [location.search, posts]);

	if (postsLoading || loading) {
		return <Spinner />;
	}

	if (error) {
		return (
			<main className="not-found-container">
				<div className="not-found-content">
					<h1>Ops!</h1>
					<h2>Nada encontrado</h2>
					<p>
						Não encontramos resultados para "{search}". Aqui estão
						algumas sugestões:
					</p>
					<ul>
						<li>Verifique se há erros de digitação ou ortografia</li>
						<li>Tente usar palavras-chave mais gerais</li>
						<li>Experimente usar sinônimos</li>
					</ul>
					<p>
						Se ainda não encontrar o que procura, talvez o conteúdo
						não esteja disponível no momento.
					</p>
					<Button as={Link} variant="pill" to="/">
						Voltar para a Página Inicial
					</Button>
				</div>
			</main>
		);
	}

	return (
		<Container className="archive-container">
			<h1>Resultado(s) para:</h1>
			<h2 style={{ marginLeft: "var(--space-rem-1)" }}>{search}</h2>
			<div className="filtered-posts">
				<PostList key={search} postsList={results} />
			</div>
		</Container>
	);
}
