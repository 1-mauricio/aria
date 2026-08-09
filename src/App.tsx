import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import Header from "./components/Layout/Header";
import Home from "./features/posts/pages/Home";
import Archive from "./features/posts/pages/Archive";
import PostDetail from "./features/posts/pages/PostDetail";
import About from "./pages/About";
import Footer from "./components/Layout/Footer";
import Subscribe from "./pages/Subscribe";
import Donate from "./features/donations/pages/Donate";
import NotFound from "./pages/NotFound";
import Search from "./features/posts/pages/SearchPage";

import CONFIG from "./CONFIG";
import { Helmet } from "react-helmet";
import { queryClient, persistOptions } from "./shared/api/queryClient";

export default function App() {
	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={persistOptions}
		>
			<BrowserRouter>
				<Helmet>
					<title>{CONFIG.seo.title}</title>
					<meta name="description" content={CONFIG.seo.description} />
					<meta name="author" content={CONFIG.siteName} />
					<meta name="keywords" content={CONFIG.seo.keywords} />
					<meta property="og:title" content={CONFIG.seo.title} />
					<meta
						property="og:description"
						content={CONFIG.seo.description}
					/>
					<meta property="og:url" content={CONFIG.seo.url} />
					<meta property="og:image" content={CONFIG.seo.image} />
					<meta property="og:type" content="website" />
				</Helmet>
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
		</PersistQueryClientProvider>
	);
}
