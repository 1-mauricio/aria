import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from "../../services/PostService";
import "../styles/post-detail.css";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostById(id)
      .then(setPost)
      .catch((error) => console.error('Erro ao carregar post:', error));
  }, [id]);

  if (!post) return <p>Carregando...</p>;

  return (
    <article className="post-detail">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <h2 className="post-subtitle">{post.subTitle}</h2>
        <div className="post-meta">
          <span className="post-category">{post.category}</span>
          <span className="post-date">{post.date}</span>
          <span className="post-read-time">{post.readTime}</span>
        </div>
      </header>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </article>
  );
}
