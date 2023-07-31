/**
 * Tests if the given value is an AbortError. AbortError is related to AbortController and AbortSignal.
 * In Node, it doesn't necessarily inherit from Error (sigh).
 * https://developer.mozilla.org/en-US/docs/Web/API/AbortController
 * **/

export function isAbortError(error: unknown): error is object & { name: "AbortError" } {
	return typeof error === "object" && (error as null | { name?: unknown })?.name === "AbortError";
}
