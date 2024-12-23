import React, { useEffect, useState } from 'react';
import PostItem from '../Posts/PostItem';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../services/PostService';
import '../styles/home.css';

export default function Home() {
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

  const featuredPost = posts.length > 0 ? posts[0] : null;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Bem-vindo ao Imprensa Malakoff</h1>
          <p>Fique por dentro das últimas notícias e tendências sobre design, tecnologia e ética na web.</p>
          <Link to="/archive" className="cta-btn">Explorar Todos os Posts</Link> 
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="featured-post">
          <h2>Post em Destaque</h2>
          <PostItem post={featuredPost} />
          <Link to={`/posts/${featuredPost.id}`} className="featured-post-link">Leia o post completo</Link>
        </section>
      )}

      {/* Latest Posts */}
      <section className="latest-posts">
        <h2>Últimos Posts</h2>
        <div className="posts-list">
          {posts.slice(0, 3).map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </section>

    </main>
  );
}
