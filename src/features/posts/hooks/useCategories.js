import { useMemo } from "react";
import { usePosts } from "./usePosts";

export function useCategories() {
	const { data: posts = [] } = usePosts();

	return useMemo(
		() =>
			[...new Set(posts.map((post) => post.category?.toLowerCase()))].filter(
				Boolean
			),
		[posts]
	);
}
