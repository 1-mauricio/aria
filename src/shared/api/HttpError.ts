export class HttpError extends Error {
	constructor(message, { status, url } = {}) {
		super(message);
		this.name = "HttpError";
		this.status = status;
		this.url = url;
	}
}
