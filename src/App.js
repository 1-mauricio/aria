import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './components/Pages/Home';
import Archive from './components/Pages/Archive';
import PostDetail from './components/Posts/PostDetail';
import About from './components/Pages/About';
import { fetchPosts } from './services/PostService';
import Footer from './components/Layout/Footer';
import Subscribe from './components/Pages/Subscribe';

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Carrega os posts ao montar o componente
    fetchPosts()
      .then(setPosts)
      .catch((error) => console.error('Erro ao carregar os posts:', error));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive posts={posts} />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
