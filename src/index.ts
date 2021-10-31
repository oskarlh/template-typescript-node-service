import process from "process";
import { setTimeout } from "timers";
import main from "./main";

// SIGINT & error handling. Calls main()

const SHUTDOWN_LINGERING_REQUESTS_TIMEOUT_SECONDS = 2 * 60;
const SHUTDOWN_MAIN_TIMEOUT_SECONDS = 15 * 60;

(async () => {
	const sigintController = new AbortController();

	let mainFinished = false;

	process.once("SIGINT", () => {
		console.log("Received SIGINT. Shutting down...");
		sigintController.abort();
		setTimeout(() => {
			if (!mainFinished) {
				console.error(
					"Process killed after waiting for main() to finish for %fs",
					SHUTDOWN_MAIN_TIMEOUT_SECONDS,
				);
				process.kill(process.pid, "SIGINT");
			}
		}, SHUTDOWN_MAIN_TIMEOUT_SECONDS * 1000).unref();
	});

	try {
		await main(sigintController.signal);
	} catch (error) {
		console.error("main() threw:\n%o", error);
	}
	mainFinished = true;

	// This SHOULDN'T be necessary, but from experience it's not uncommon
	// for developers to forget to close sockets, timers etc.
	setTimeout(() => {
		console.error(
			"Failed to shut down gracefully after waiting %fs for requests to terminate",
			SHUTDOWN_LINGERING_REQUESTS_TIMEOUT_SECONDS,
		);
		process.kill(process.pid, "SIGINT");
	}, SHUTDOWN_LINGERING_REQUESTS_TIMEOUT_SECONDS * 1000).unref();
})();
