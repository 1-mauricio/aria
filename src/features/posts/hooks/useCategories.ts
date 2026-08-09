import { useMemo } from "react";
import { usePosts } from "./usePosts";

export function useCategories(): string[] {
	const { data: posts = [] } = usePosts();

	return useMemo(
		() =>
			[...new Set(posts.map((post) => post.category?.toLowerCase()))].filter(
				(category): category is string => Boolean(category)
			),
		[posts]
	);
}
