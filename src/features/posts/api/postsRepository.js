import CONFIG from "../../../CONFIG";
import { httpClient } from "../../../shared/api/httpClient";
import { formatDate, formatTime } from "../../../shared/utils/dateFormat";

const POSTS_URL = `${CONFIG.apiUrl}/api/posts`;

const withFormattedDate = (post) => ({
	...post,
	date: formatDate(post.date),
	time: formatTime(post.date),
});

export const postsRepository = {
	async fetchPosts() {
		const posts = await httpClient.get(POSTS_URL);
		return posts.map(withFormattedDate);
	},

	async fetchPostByCustomLink(customLink) {
		const post = await httpClient.get(
			`${POSTS_URL}/customLink?customLink=${encodeURIComponent(customLink)}`
		);
		return withFormattedDate(post);
	},

	async fetchPostById(id, { updateViewsCount = false } = {}) {
		const url = updateViewsCount
			? `${POSTS_URL}/${id}?updateViewsCount=true`
			: `${POSTS_URL}/${id}`;
		const post = await httpClient.get(url);
		return withFormattedDate(post);
	},

	likePost(id) {
		return httpClient.post(`${POSTS_URL}/${id}/like`);
	},

	unlikePost(id) {
		return httpClient.post(`${POSTS_URL}/${id}/unlike`);
	},
};
