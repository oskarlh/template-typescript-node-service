import { config } from "dotenv";
import { existsSync } from "fs";

function loadEnvFiles() {
	if (existsSync(".env.local")) {
		config({ path: ".env.local" });
	}
	config({ path: ".env" });
}
loadEnvFiles();

export const SECONDS_BETWEEN_MESSAGES = Number(process.env.SECONDS_BETWEEN_MESSAGES) || 5;
