import { levenshteinDistance } from "./levenshtein";

describe("levenshteinDistance", () => {
	it("returns 0 for identical strings", () => {
		expect(levenshteinDistance("design", "design")).toBe(0);
	});

	it("returns the length of the other string when one is empty", () => {
		expect(levenshteinDistance("", "abc")).toBe(3);
		expect(levenshteinDistance("abc", "")).toBe(3);
	});

	it("counts single-character substitutions", () => {
		expect(levenshteinDistance("gato", "pato")).toBe(1);
	});

	it("counts insertions and deletions", () => {
		expect(levenshteinDistance("blog", "blogs")).toBe(1);
		expect(levenshteinDistance("blogs", "blog")).toBe(1);
	});

	it("computes distance between unrelated words", () => {
		expect(levenshteinDistance("kitten", "sitting")).toBe(3);
	});
});
