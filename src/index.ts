import process from "process";
import main from "./main";

// SIGINT & error handling. Calls main()

const SHUTDOWN_TIMEOUT_SECONDS = 10 * 60;

function finalWaitForRequestsToDie() {
	process.removeListener("SIGINT", sigintListener);
	setTimeout(() => {
		console.error(
			"Failed to shut down gracefully after waiting for requests to finish %fs",
			SHUTDOWN_TIMEOUT_SECONDS,
		);
		process.kill(process.pid, "SIGINT");
	}, SHUTDOWN_TIMEOUT_SECONDS * 1000).unref();
}

const sigintController = new AbortController();

async function sigintListener() {
	console.log("Received SIGINT. Shutting down...");
	sigintController.abort();
	finalWaitForRequestsToDie();
}

process.on("SIGINT", sigintListener);

try {
	await main(sigintController.signal);
} catch (error) {
	console.error("main() threw:\n%o", error);
}
if (!sigintController.signal.aborted) {
	finalWaitForRequestsToDie();
}
