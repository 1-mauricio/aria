import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./components/Pages/Home";
import Archive from "./components/Pages/Archive";
import PostDetail from "./components/Posts/PostDetail";
import About from "./components/Pages/About";
import Footer from "./components/Layout/Footer";
import Subscribe from "./components/Pages/Subscribe";
import Donate from "./components/Pages/Donate";
import NotFound from "./components/Pages/NotFound";
import Search from "./components/Pages/Search";

export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/posts" element={<Archive />} />
				<Route path="/posts/:category" element={<Archive />} />
				<Route path="p/:id" element={<PostDetail />} />
				<Route path="p/:titulo" element={<PostDetail />} />
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
