import { formatDate, formatTime } from "./dateFormat";

describe("formatDate", () => {
	it("formats an ISO date string as dd/mm/yyyy", () => {
		expect(formatDate("2026-03-05T12:00:00Z")).toMatch(
			/^\d{2}\/\d{2}\/\d{4}$/
		);
	});
});

describe("formatTime", () => {
	it("formats an ISO date string as hh:mm", () => {
		expect(formatTime("2026-03-05T12:00:00Z")).toMatch(/^\d{2}:\d{2}$/);
	});
});
