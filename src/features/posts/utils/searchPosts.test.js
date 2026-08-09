import { searchPosts } from "./searchPosts";

const posts = [
	{
		id: 1,
		title: "Design de interfaces modernas",
		subTitle: "Boas práticas de UI",
		category: "design",
		content: "Conteúdo sobre design e tecnologia",
	},
	{
		id: 2,
		title: "Ética na tecnologia",
		subTitle: "Discussões sobre impacto social",
		category: "ética",
		content: "Um texto sobre ética digital",
	},
	{
		id: 3,
		title: "Receita de bolo",
		subTitle: "Sobremesa fácil",
		category: "culinária",
		content: "Ingredientes e modo de preparo",
	},
];

describe("searchPosts", () => {
	it("returns all posts unchanged when there is no search term", () => {
		expect(searchPosts("", posts)).toBe(posts);
	});

	it("matches posts by exact substring in any field", () => {
		const result = searchPosts("design", posts);
		expect(result.map((post) => post.id)).toEqual([1]);
	});

	it("ranks posts with more/stronger matches higher", () => {
		const result = searchPosts("tecnologia", posts);
		expect(result.map((post) => post.id)).toContain(1);
		expect(result.map((post) => post.id)).toContain(2);
		expect(result[0].searchScore).toBeGreaterThanOrEqual(result[1].searchScore);
	});

	it("finds posts via fuzzy (similarity) matches on typos", () => {
		const result = searchPosts("desing", posts);
		expect(result.map((post) => post.id)).toContain(1);
	});

	it("excludes posts with no matching score", () => {
		const result = searchPosts("astronomia", posts);
		expect(result).toHaveLength(0);
	});

	it("does not match unrelated posts", () => {
		const result = searchPosts("receita", posts);
		expect(result.map((post) => post.id)).toEqual([3]);
	});
});
