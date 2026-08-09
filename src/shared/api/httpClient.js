import { HttpError } from "./HttpError";

const DEFAULT_TIMEOUT_MS = 10000;

async function request(url, { timeoutMs = DEFAULT_TIMEOUT_MS, ...options } = {}) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

	let response;
	try {
		response = await fetch(url, { ...options, signal: controller.signal });
	} catch (error) {
		if (error.name === "AbortError") {
			throw new HttpError(`Tempo de requisição esgotado: ${url}`, { url });
		}
		throw new HttpError(error.message, { url });
	} finally {
		clearTimeout(timeoutId);
	}

	if (!response.ok) {
		throw new HttpError(`Erro ${response.status} ao acessar ${url}`, {
			status: response.status,
			url,
		});
	}

	if (response.status === 204) return null;
	return response.json();
}

export const httpClient = {
	get: (url, options) => request(url, { ...options, method: "GET" }),
	post: (url, options) => request(url, { ...options, method: "POST" }),
};
