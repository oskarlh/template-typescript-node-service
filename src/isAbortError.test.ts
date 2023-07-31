import { setTimeout } from "timers/promises";

import { isAbortError } from "./isAbortError.js";

const notAbortErrors = [
	new DOMException("AbortError", "The name is wrong so this is not an AbortError"),
	new DOMException("abc", "AbortError? No"),
	{ comment: "This is just some object", name: "NotAbortError" },
	"AbortError",
	new Error(),
	451,
	1n,
	true,
	false,
	null,
	undefined,
	[new DOMException("AbortError", "AbortError")],
];

describe("isAbortError", () => {
	it("recognizes AbortErrors from Node's internal modules", async () => {
		const abortController = new AbortController();
		abortController.abort();
		const abortError = await setTimeout(1, undefined, {
			signal: abortController.signal,
		}).catch((e) => e);

		expect(isAbortError(abortError)).toBe(true);
	});

	it("recognizes manually created AbortErrors", async () => {
		expect(isAbortError(new DOMException("Abc", "AbortError"))).toBe(true);
		expect(isAbortError({ name: "AbortError" })).toBe(true);
	});

	it("does not consider other errors to be AbortErrors", async () => {
		for (const notAnAbortError of notAbortErrors) {
			expect(isAbortError(notAnAbortError)).toBe(false);
		}
	});
});
