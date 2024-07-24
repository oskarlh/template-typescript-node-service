import { setTimeout } from "node:timers/promises";

export async function sleep(timeInSeconds: number, signal?: AbortSignal): Promise<void> {
	return setTimeout<undefined>(timeInSeconds * 1000, undefined, {
		signal,
	});
}
