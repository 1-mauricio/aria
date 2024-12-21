import React, { useEffect, useState } from 'react';
import PostItem from '../Posts/PostItem';
import { fetchPosts } from '../../services/PostService';
import '../styles/home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  const featuredPost = posts.length > 0 ? posts[0] : null;

  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Bem-vindo ao ImprensaMalakoff</h1>
          <p>Fique por dentro das últimas notícias e tendências sobre design, tecnologia e ética na web.</p>
          <a href="/archive" className="cta-btn">Explorar Todos os Posts</a>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="featured-post">
          <h2>Post em Destaque</h2>
          <PostItem post={featuredPost} />
          <a href={`/posts/${featuredPost.id}`} className="featured-post-link">Leia o post completo</a>
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
