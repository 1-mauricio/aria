import { HttpError } from "./HttpError";

const DEFAULT_TIMEOUT_MS = 10000;

interface RequestOptions extends RequestInit {
	timeoutMs?: number;
}

async function request<T>(
	url: string,
	{ timeoutMs = DEFAULT_TIMEOUT_MS, ...options }: RequestOptions = {}
): Promise<T> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

	let response: Response;
	try {
		response = await fetch(url, { ...options, signal: controller.signal });
	} catch (error) {
		if (error instanceof Error && error.name === "AbortError") {
			throw new HttpError(`Tempo de requisição esgotado: ${url}`, { url });
		}
		throw new HttpError(
			error instanceof Error ? error.message : String(error),
			{ url }
		);
	} finally {
		clearTimeout(timeoutId);
	}

	if (!response.ok) {
		throw new HttpError(`Erro ${response.status} ao acessar ${url}`, {
			status: response.status,
			url,
		});
	}

	if (response.status === 204) return null as T;
	return response.json();
}

export const httpClient = {
	get: <T,>(url: string, options?: RequestOptions) =>
		request<T>(url, { ...options, method: "GET" }),
	post: <T,>(url: string, options?: RequestOptions) =>
		request<T>(url, { ...options, method: "POST" }),
};
