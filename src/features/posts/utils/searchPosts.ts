import { levenshteinDistance } from "../../../shared/utils/levenshtein";
import { Post } from "../types";

const isSimilar = (term: string, word: string, maxDistance = 2): boolean =>
	levenshteinDistance(term, word) <= maxDistance;

const SEARCHABLE_FIELDS: (keyof Post)[] = [
	"title",
	"subTitle",
	"category",
	"content",
];

export const searchPosts = (searchTerm: string, posts: Post[]): Post[] => {
	if (!searchTerm) return posts;

	const normalizedTerm = searchTerm.toLowerCase().trim();
	const terms = normalizedTerm.split(" ").filter((term) => term.length > 2);

	return posts
		.map((post) => {
			let score = 0;

			SEARCHABLE_FIELDS.forEach((field) => {
				const fieldContent = String(post[field] ?? "").toLowerCase();

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
