import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsRepository } from "../api/postsRepository";

export function useLikePost() {
	const queryClient = useQueryClient();

	const updateLikesInCache = (postId, delta) => {
		queryClient.setQueryData(["posts"], (posts) =>
			posts?.map((post) =>
				post.id === postId ? { ...post, likes: post.likes + delta } : post
			)
		);
	};

	const likeMutation = useMutation({
		mutationFn: (postId) => postsRepository.likePost(postId),
		onMutate: (postId) => updateLikesInCache(postId, 1),
	});

	const unlikeMutation = useMutation({
		mutationFn: (postId) => postsRepository.unlikePost(postId),
		onMutate: (postId) => updateLikesInCache(postId, -1),
	});

	return { like: likeMutation.mutate, unlike: unlikeMutation.mutate };
}
