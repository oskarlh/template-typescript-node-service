import sleep from "./sleep";

export default async function main(shutdownSignal: AbortSignal): Promise<void> {
	console.log("Hello");
	await sleep(5, shutdownSignal);
	console.log("5 seconds have passed");
	await sleep(5, shutdownSignal);
	console.log("Another 5 seconds have passed");
}
