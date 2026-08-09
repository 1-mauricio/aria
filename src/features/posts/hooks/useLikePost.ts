import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsRepository } from "../api/postsRepository";
import { Post } from "../types";

export function useLikePost() {
	const queryClient = useQueryClient();

	const updateLikesInCache = (postId: number, delta: number) => {
		queryClient.setQueryData<Post[]>(["posts"], (posts) =>
			posts?.map((post) =>
				post.id === postId ? { ...post, likes: post.likes + delta } : post
			)
		);
	};

	const likeMutation = useMutation({
		mutationFn: (postId: number) => postsRepository.likePost(postId),
		onMutate: (postId: number) => updateLikesInCache(postId, 1),
	});

	const unlikeMutation = useMutation({
		mutationFn: (postId: number) => postsRepository.unlikePost(postId),
		onMutate: (postId: number) => updateLikesInCache(postId, -1),
	});

	return { like: likeMutation.mutate, unlike: unlikeMutation.mutate };
}
