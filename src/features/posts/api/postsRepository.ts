import CONFIG from "../../../CONFIG";
import { httpClient } from "../../../shared/api/httpClient";
import { formatDate, formatTime } from "../../../shared/utils/dateFormat";
import { Post } from "../types";

const POSTS_URL = `${CONFIG.apiUrl}/api/posts`;

const withFormattedDate = (post: Post): Post => ({
	...post,
	date: formatDate(post.date),
	time: formatTime(post.date),
});

interface FetchPostByIdOptions {
	updateViewsCount?: boolean;
}

export const postsRepository = {
	async fetchPosts(): Promise<Post[]> {
		const posts = await httpClient.get<Post[]>(POSTS_URL);
		return posts.map(withFormattedDate);
	},

	async fetchPostByCustomLink(customLink: string): Promise<Post> {
		const post = await httpClient.get<Post>(
			`${POSTS_URL}/customLink?customLink=${encodeURIComponent(customLink)}`
		);
		return withFormattedDate(post);
	},

	async fetchPostById(
		id: number,
		{ updateViewsCount = false }: FetchPostByIdOptions = {}
	): Promise<Post> {
		const url = updateViewsCount
			? `${POSTS_URL}/${id}?updateViewsCount=true`
			: `${POSTS_URL}/${id}`;
		const post = await httpClient.get<Post>(url);
		return withFormattedDate(post);
	},

	likePost(id: number) {
		return httpClient.post(`${POSTS_URL}/${id}/like`);
	},

	unlikePost(id: number) {
		return httpClient.post(`${POSTS_URL}/${id}/unlike`);
	},
};
