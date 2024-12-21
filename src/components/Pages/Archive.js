// ArchivePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages.css';
import PostList from '../Posts/PostList';

export default function Archive({ posts }) {
  if (!Array.isArray(posts)) {
    return <p>Carregando posts...</p>;
  }

  return (
    <main className="archive-container">
      <h1>Posts</h1>
      <PostList />
    </main>
  );
}
