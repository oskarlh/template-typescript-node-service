import { setTimeout } from "node:timers/promises";

export default async function sleep(timeInSeconds: number, signal?: AbortSignal): Promise<void> {
	return setTimeout<void>(timeInSeconds * 1000, undefined, {
		signal,
	});
}
