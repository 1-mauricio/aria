import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchPost } from '../../services/PostService';
import PostList from '../Posts/PostList';

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('searchTerm');

    if (searchTerm) {
      setLoading(true); 
      setError(null); 
      setSearch(searchTerm);
      searchPost(searchTerm)
        .then((data) => {
          setPosts(data);
          setLoading(false); 
        })
        .catch((err) => {
          console.error(err);
          setError('Erro ao buscar posts');
          setLoading(false);
        });
    } else {
      setPosts([]);
      setLoading(false); 
    }
  }, [location.search]);

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
            <h1>404</h1>
          <h2>Termo não encontrado</h2>
          <p>O termo "{search}" não teve nenhum retorno.</p>

          <Link to="/" className="home-button">Voltar para Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="archive-container">
        <h1>Resultado</h1>
        <PostList postsList={posts} />
    </main>
  );
}
