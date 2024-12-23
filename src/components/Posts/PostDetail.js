import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from "../../services/PostService";
import "../styles/post-detail.css";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de loading

  useEffect(() => {
    setLoading(true); // Começa o carregamento
    fetchPostById(id)
      .then((data) => {
        setPost(data);
        setLoading(false); // Finaliza o carregamento
      })
      .catch((error) => {
        console.error('Erro ao carregar post:', error);
        setLoading(false); // Finaliza o carregamento mesmo em caso de erro
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <article className="post-detail">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <em><p className="post-subtitle">{post.subTitle}</p></em>
        <div className="post-meta">
          <span className="post-category">{post.category}</span>
          <span className="post-date">{post.date}</span>
          <span className="post-read-time">{post.readTime} min</span>
        </div>
      </header>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </article>
  );
}
