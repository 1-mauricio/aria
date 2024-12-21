import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { fetchPosts } from '../../services/PostService';
import '../styles/posts.css';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((error) => console.error('Erro ao carregar posts:', error));
  }, []);

  return (
    <main className="archive-container">
      <div className="posts-list">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
