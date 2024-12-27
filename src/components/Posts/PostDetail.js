import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, fetchPostByTitle } from "../../services/PostService";
import NotFound from '../Pages/NotFound';

export default function PostDetail() {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function generateSlug(titulo) {
    return titulo.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  }

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchPost = async () => {
      try {
        let data;
        const param = parseInt(id);
        console.log(generateSlug(id));
        if (!isNaN(param)) {
          data = await fetchPostById(id);
        } else {
          data = await fetchPostByTitle(id);
        }
        console.log(data);
        if (data) {
          setPost(data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Erro ao carregar post:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !post) {
    return <NotFound />;
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
