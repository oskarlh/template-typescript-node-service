import isAbortError from "./isAbortError.js";
import sleep from "./sleep.js";

export default async function main(shutdownSignal: AbortSignal): Promise<void> {
	try {
		console.log("Hello!");
		await sleep(5, shutdownSignal);
		console.log("5 seconds have passed");
		await sleep(5, shutdownSignal);
		console.log("Another 5 seconds have passed");
	} catch (error) {
		if (isAbortError(error)) {
			console.log("Aborted.");
		} else {
			console.error("Failed with exception: %o", error);
		}
	}
}
