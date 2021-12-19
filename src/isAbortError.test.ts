import { setTimeout } from "timers/promises";

import isAbortError from "./isAbortError.js";

// TODO: Remove this nonsense once Jest stops deleting DOMException
// ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
let DOMExceptionType: typeof DOMException;
if (typeof DOMException === "undefined") {
	// @ts-ignore
	DOMExceptionType = class DOMException extends Error {
		constructor(message?: string, name?: string) {
			super(message);
			if (name) {
				this.name = name;
			}
		}
	};
} else {
	DOMExceptionType = DOMException;
}
// ⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆

const notAbortErrors = [
	new DOMExceptionType(
		"AbortError",
		"The name is wrong so this is not an AbortError",
	),
	new DOMExceptionType("abc", "AbortError? No"),
	{ comment: "This is just some object", name: "AbortError" },
	"AbortError",
	new Error(),
	451,
	1n,
	true,
	false,
	null,
	undefined,
	[new DOMExceptionType("AbortError", "AbortError")],
];

describe("isAbortError", () => {
	// TODO: Enable this once Jest stops deleting DOMException
	// ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
	xit("recognizes AbortErrors from Node's internal modules", async () => {
		const abortController = new AbortController();
		abortController.abort();
		const abortError = await setTimeout(1, undefined, {
			signal: abortController.signal,
		}).catch((e) => e);
		expect(isAbortError(abortError)).toBe(true);
	});
	// ⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆

	it("recognizes manually created AbortErrors", async () => {
		expect(isAbortError(new DOMExceptionType("Abc", "AbortError"))).toBe(true);
	});

	it("does not consider other errors to be AbortErrors", async () => {
		for (const notAnAbortError of notAbortErrors) {
			expect(isAbortError(notAnAbortError)).toBe(false);
		}
	});

	// TODO: When https://github.com/nodejs/node/issues/40692 has been fixed, enable this test and
	// replace "Error" with "DOMException" in the implementation
	xit("recognizes DOMExceptions only", () => {
		const notAnAbortError = new Error(); // Wrong type for an AbortError
		notAnAbortError.name = "AbortError";
		expect(isAbortError(notAnAbortError)).toBe(false);
	});
});
