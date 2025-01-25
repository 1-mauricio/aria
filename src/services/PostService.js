import CONFIG from "../CONFIG";

const API_URL = CONFIG.apiUrl + "/api/posts";

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("pt-BR");
};

export const fetchPosts = async () => {
	const response = await fetch(API_URL);
	if (!response.ok) throw new Error("Erro ao buscar posts");
	const posts = await response.json();

	const formattedPosts = posts.map((post) => ({
		...post,
		date: formatDate(post.date),
	}));

	return formattedPosts;
};

export async function fetchPostByCustomLink(title) {
	const response = await fetch(
		`${API_URL}/customLink?customLink=${encodeURIComponent(title)}`
	);
	if (!response.ok) throw new Error("Erro ao buscar post pelo título");

	const post = await response.json();

	post.date = formatDate(post.date);

	return post;
}

export const fetchPostById = async (id, updateViewsCount = false) => {
	try {
		const url = updateViewsCount
			? `${API_URL}/${id}?updateViewsCount=true`
			: `${API_URL}/${id}`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Erro ao buscar post");
		}

		const post = await response.json();

		post.date = formatDate(post.date);

		return post;
	} catch (error) {
		console.error("Erro ao buscar post:", error);
		throw error;
	}
};

export const likePost = async (post) => {
	const { id } = post;
	const response = await fetch(`${API_URL}/${id}/like`, {
		method: "POST",
	});

	if (!response.ok) throw new Error("Erro ao curtir post");

	post.likes += 1;
	updatePostInCache(post);

	return true;
};

export const unlikePost = async (post) => {
	const { id } = post;
	const response = await fetch(`${API_URL}/${id}/unlike`, {
		method: "POST",
	});
	if (!response.ok) throw new Error("Erro ao curtir post");

	post.likes -= 1;
	updatePostInCache(post);

	return true;
};

const updatePostInCache = (updatedPost) => {
	const cachedPosts = JSON.parse(localStorage.getItem("cached_posts"));
	const updatedCache = cachedPosts.map((post) =>
		post.id === updatedPost.id ? updatedPost : post
	);
	localStorage.setItem("cached_posts", JSON.stringify(updatedCache));
};

const levenshteinDistance = (a, b) => {
	const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
		Array.from({ length: b.length + 1 }, (_, j) =>
			i === 0 ? j : j === 0 ? i : 0
		)
	);

	for (let i = 1; i <= a.length; i++) {
		for (let j = 1; j <= b.length; j++) {
			matrix[i][j] =
				a[i - 1] === b[j - 1]
					? matrix[i - 1][j - 1]
					: Math.min(
							matrix[i - 1][j],
							matrix[i][j - 1],
							matrix[i - 1][j - 1]
					  ) + 1;
		}
	}

	return matrix[a.length][b.length];
};

const isSimilar = (term, word, maxDistance = 2) =>
	levenshteinDistance(term, word) <= maxDistance;

export const searchPost = (searchTerm, posts) => {
	if (!searchTerm) return posts;

	const normalizedTerm = searchTerm.toLowerCase().trim();
	const terms = normalizedTerm.split(" ").filter((term) => term.length > 2);

	return posts
		.map((post) => {
			let score = 0;

			const fields = ["title", "subTitle", "category", "content"];

			fields.forEach((field) => {
				const fieldContent = post[field]?.toLowerCase() || "";

				if (fieldContent.includes(normalizedTerm)) score += 10;

				fieldContent.split(" ").forEach((word) => {
					terms.forEach((term) => {
						if (isSimilar(term, word)) {
							score += 5;
						}
					});
				});
			});

			return { ...post, searchScore: score };
		})
		.filter((post) => post.searchScore > 0)
		.sort((a, b) => b.searchScore - a.searchScore);
};
