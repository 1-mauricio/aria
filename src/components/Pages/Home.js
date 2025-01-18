import React, { useEffect, useState } from 'react';
import PostItem from '../Posts/PostItem';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../services/PostService';
import DonationSection from './DonationSection';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mostViewedWeek, setMostViewedWeek] = useState([]);
  const [mostViewedMonth, setMostViewedMonth] = useState([]);
  const [featuredPost, setfeaturedPost] = useState(null);
  const [latestPosts, setlatestPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchPosts()
      .then((data) => {
        
        setfeaturedPost(data.length > 0 ? data[0] : null);

        setlatestPosts(data)

        const sortedWeek = data
          .sort((a, b) => b.viewsThisWeek - a.viewsThisWeek)
          .slice(0, 3); 
        setMostViewedWeek(sortedWeek);

        const sortedMonth = data
          .sort((a, b) => b.viewsThisMonth - a.viewsThisMonth)
          .slice(0, 3); 
        setMostViewedMonth(sortedMonth);

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

  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>A ÁRIA</h1>
          <p>Fique por dentro das últimas notícias e tendências sobre design, tecnologia e ética na web.</p>
          {/* <Link to="/posts" className="cta-btn">Explorar Todos os Posts</Link> */}
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="featured-post">
          <h2>Post em Destaque</h2>
          <PostItem post={featuredPost} />
          <Link to={`/post/${featuredPost.title}`} className="cta-btn ">Leia o post completo</Link>
        </section>
      )}

      <div className="most-viewed-container">
        <div className="most-viewed-section">
            <h2>Mais lidos da semana</h2>
            <div className="most-viewed-list">
            {mostViewedWeek.length ? (
                mostViewedWeek.map((post, index) => (
                <Link to={`/post/${post.title}`} key={post.id} className="most-viewed-item">
                    <span className="most-viewed-number">{index + 1}</span>
                    <div className="most-viewed-content">
                    <h3>{post.title}</h3>
                    <span className="most-viewed-date">{post.date}</span>
                    </div>
                </Link>
                ))
            ) : (
                <p>Nenhum post visualizado esta semana.</p>
            )}
            </div>
        </div>

        <div className="most-viewed-section">
            <h2>Mais lidos do mês</h2>
            <div className="most-viewed-list">
            {mostViewedMonth.length ? (
                mostViewedMonth.map((post, index) => (
                <Link to={`/post/${post.title}`} key={post.id} className="most-viewed-item">
                    <span className="most-viewed-number">{index + 1}</span>
                    <div className="most-viewed-content">
                    <h3>{post.title}</h3>
                    <span className="most-viewed-date">{post.date}</span>
                    </div>
                </Link>
                ))
            ) : (
                <p>Nenhum post visualizado este mês.</p>
            )}
            </div>
        </div>
      </div>

      {/* Latest Posts */}
      <section className="latest-posts">
        <h2>Últimos Posts</h2>
        <div className="posts-list">
          {latestPosts.slice(0, 3).map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </section>

          <DonationSection width='40%' />
    </main>
  );
}
