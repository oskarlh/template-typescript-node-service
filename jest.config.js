/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	preset: "ts-jest",
	rootDir: "./src",
	testEnvironment: "node",
	testRegex: "\\.test\\.ts$",
};
