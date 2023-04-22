import { SECONDS_BETWEEN_MESSAGES } from "./config.js";
import isAbortError from "./isAbortError.js";
import sleep from "./sleep.js";

export default async function main(shutdownSignal: AbortSignal): Promise<void> {
	try {
		console.log("Hello!");
		await sleep(SECONDS_BETWEEN_MESSAGES, shutdownSignal);
		console.log(`${SECONDS_BETWEEN_MESSAGES} seconds have passed`);
		await sleep(SECONDS_BETWEEN_MESSAGES, shutdownSignal);
		console.log(`Another ${SECONDS_BETWEEN_MESSAGES} seconds have passed`);
	} catch (error) {
		if (isAbortError(error)) {
			console.log("Aborted.");
		} else {
			console.error("Failed with exception: %o", error);
		}
	}
}
