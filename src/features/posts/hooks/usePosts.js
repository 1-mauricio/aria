import { useQuery } from "@tanstack/react-query";
import { postsRepository } from "../api/postsRepository";

export function usePosts() {
	return useQuery({
		queryKey: ["posts"],
		queryFn: postsRepository.fetchPosts,
	});
}
