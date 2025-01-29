import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchPost } from "../../services/PostService";
import "../styles/not-found.css";
import PostList from "./PostList";
import CONFIG from "../../CONFIG";

export default function Search({ data = [] }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState(null);
	const [postListJSX, setPostListJSX] = useState(null);
	const location = useLocation();

	document.title = "Pesquisa - " + CONFIG.siteName;
	window.scrollTo(0, 0);

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const searchTerm = queryParams.get("searchTerm");

		if (searchTerm) {
			setLoading(true);
			setError(null);
			setSearch(searchTerm);

			const result = searchPost(searchTerm, data);

			if (result.length > 0) {
				const jsx = <PostList key={search} postsList={result} />
				setPostListJSX(jsx);
				setLoading(false);
			} else {
				setError("Erro ao buscar posts");
				setLoading(false);
			}
		}
	}, [location.search, data]);

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
			</div>
		);
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
					<Link to="/" className="home-button">
						Voltar para a Página Inicial
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className="archive-container">
			<h1>Resultado(s) para:</h1>
			<h2 style={{marginLeft: "1rem"}}>{search}</h2>
			<div className="filtered-posts">{postListJSX}</div>
		</main>
	);
}
