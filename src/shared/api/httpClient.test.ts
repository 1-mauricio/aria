import { httpClient } from "./httpClient";

describe("httpClient", () => {
	afterEach(() => {
		jest.restoreAllMocks();
		jest.useRealTimers();
		delete (global as any).fetch;
	});

	it("returns parsed JSON on success", async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({ hello: "world" }),
		}) as unknown as typeof fetch;

		const result = await httpClient.get<{ hello: string }>(
			"https://api.test/posts"
		);

		expect(result).toEqual({ hello: "world" });
		expect(global.fetch).toHaveBeenCalledWith(
			"https://api.test/posts",
			expect.objectContaining({ method: "GET" })
		);
	});

	it("throws an HttpError with the status when the response is not ok", async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			status: 404,
			json: async () => ({}),
		}) as unknown as typeof fetch;

		await expect(
			httpClient.get("https://api.test/posts/1")
		).rejects.toMatchObject({ name: "HttpError", status: 404 });
	});

	it("returns null for 204 No Content responses", async () => {
		global.fetch = jest
			.fn()
			.mockResolvedValue({ ok: true, status: 204 }) as unknown as typeof fetch;

		const result = await httpClient.post("https://api.test/posts/1/like");

		expect(result).toBeNull();
	});

	it("throws an HttpError when the request times out", async () => {
		global.fetch = jest.fn((_url: RequestInfo | URL, options?: RequestInit) => {
			return new Promise((_resolve, reject) => {
				options?.signal?.addEventListener("abort", () => {
					const error = new Error("aborted");
					error.name = "AbortError";
					reject(error);
				});
			});
		}) as unknown as typeof fetch;

		await expect(
			httpClient.get("https://api.test/slow", { timeoutMs: 10 })
		).rejects.toMatchObject({ name: "HttpError" });
	});
});
