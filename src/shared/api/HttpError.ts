export interface HttpErrorOptions {
	status?: number;
	url?: string;
}

export class HttpError extends Error {
	status?: number;
	url?: string;

	constructor(message: string, { status, url }: HttpErrorOptions = {}) {
		super(message);
		this.name = "HttpError";
		this.status = status;
		this.url = url;
	}
}
