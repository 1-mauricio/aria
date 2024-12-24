import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/posts.css';

export default function PostItem({ post }) {
  return (
    <article className="post-item">
      <div className="post-category">{post.category}</div>
      <Link to={`/posts/${post.id}`} className="post-link">
        <h2>{post.title}</h2>
        <p>{post.subTitle}</p>
        <p>{post.date} · {post.readTime} min</p>
      </Link>
    </article>
  );
}