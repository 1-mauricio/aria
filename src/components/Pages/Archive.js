import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostList from '../Posts/PostList';
import { fetchPosts } from '../../services/PostService'; // ou a função apropriada para buscar os posts

export default function Archive() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPosts() 
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar posts:', error);
        setLoading(false);
      });
  }, []);

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
      <h1>Posts</h1>
      <PostList postsList={posts} />
    </main>
  );
}
