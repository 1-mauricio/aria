import { levenshteinDistance } from "../../../shared/utils/levenshtein";

const isSimilar = (term, word, maxDistance = 2) =>
	levenshteinDistance(term, word) <= maxDistance;

export const searchPosts = (searchTerm, posts) => {
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
