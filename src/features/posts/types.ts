export interface Post {
	id: number;
	title: string;
	subTitle: string;
	category: string;
	content: string;
	date: string;
	time: string;
	readTime: number;
	likes: number;
	imageUrl?: string;
	customLink: string;
	author?: string;
	viewsThisWeek: number;
	viewsThisMonth: number;
}

export type SearchResult = Post & { searchScore: number };
