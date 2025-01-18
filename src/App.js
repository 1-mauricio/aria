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
import Donate from './components/Pages/Donate';
import NotFound from './components/Pages/NotFound';
import Search from './components/Pages/Search';

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((error) => console.error('Erro ao carregar os posts:', error));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Archive posts={posts} />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="post/:titulo" element={<PostDetail />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/inscreva-se" element={<Subscribe />} />
        <Route path="/doe" element={<Donate />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
