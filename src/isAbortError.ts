/**
 * Tests if the given value is an AbortError. AbortError is related to AbortController and AbortSignal.
 * https://developer.mozilla.org/en-US/docs/Web/API/AbortController
 * **/

export default function isAbortError(
	error: unknown,
): error is Error & { name: "AbortError" } {
	return error instanceof Error && error.name === "AbortError";
}
